import { Controller } from "@hotwired/stimulus"
import { useIntersection } from "stimulus-use";

// Connects to data-controller="autoclick"
export default class Autoclick extends Controller {
  options = {
    threshold: 0, //default
  }
  static messagesContainer;
  static topMessage;
  static throttling = false;


  connect() {
    console.log("autoclick connected")
    useIntersection(this, this.options)
  }

  appear(entry) {
    // callback auto triggered when element intersects with viewport
    if (!Autoclick.throttling) {
      Autoclick.throttling = true;
      Autoclick.messagesContainer = document.getElementById("messages-sub-container");
      Autoclick.topMessage = Autoclick.messagesContainer.children[0];
      Autoclick.throttle(this.element.click(), 300);

      setTimeout(() => {
        Autoclick.topMessage.scrollIntoView({ behavior: "auto", block: "end",});
        console.log("scrolling");
        Autoclick.throttling = false;
      }, 500);
    }
  }

  disappear(entry) {
    // callback auto triggered when element leaves viewport
  }

  static throttle(func, wait) {
    let timeout = null;
    let previous = 0;

    let later = function () {
      previous = Data.now();
      timeout = null;
      func();
    };

    return function() {
      let now = Date.now();
      let remaining = wait - (now - previous);

      if (remaining <=0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
        }
        later();
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
    }
  }
}
