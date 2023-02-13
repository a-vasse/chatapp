import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {

    //Replaces old "DomNodeInserted" with "MutationObserver"
    //Created MutationObserver object and passed the resetScroll function as its callback.
    //Called the observe method on the observer and pass messages as its target.
    //This sets up the observer to observe the messages element for any changes to its child nodes.
    console.log("Connected");
    const messages = document.getElementById("messages");
    const observer = new MutationObserver(this.resetScroll);
    observer.observe(messages, { childList: true });
    this.resetScroll(messages);
  }

  disconnect() {
    console.log("Disconnected");
  }

  resetScroll() {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }
}
