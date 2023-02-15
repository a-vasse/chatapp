import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  initialize() {
    this.resetScrollWihthoutThreshold(messages);
  }

  connect() {
    //Replaces old "DomNodeInserted" with "MutationObserver"
    //Created MutationObserver object and passed the resetScroll function as its callback.
    //Called the observe method on the observer and pass messages as its target.
    //This sets up the observer to observe the messages element for any changes to its child nodes.
    console.log("Connected");
    const messages = document.getElementById("messages");
    const observer = new MutationObserver(this.resetScroll);
    observer.observe(messages, { childList: true });
  }

  disconnect() {
    console.log("Disconnected");
  }

  resetScroll() {
    const bottomOfScroll = messages.scrollHeight - messages.clientHeight;
    const upperScrollThreshold = bottomOfScroll - 500;
    if (messages.scrollTop > upperScrollThreshold) {
      this.resetScrollWihthoutThreshold(messages);
    }
  }

  resetScrollWihthoutThreshold(messages) {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }
}
