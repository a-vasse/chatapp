import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Connected");
    const messages = document.getElementById("messages");
    messages.addEventListener("DomNodeInserted", this.resetScroll);
    this.resetScroll(messages);
  }

  disconnect() {
    console.log("Disconnected");
  }

  resetScroll() {
    console.log("Reset Scroll Action");
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }
}
