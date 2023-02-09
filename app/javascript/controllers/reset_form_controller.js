import { controller } from "@hotwire/stimulus";

export default class extends Controller {
  reset() {
    this.element.reset();
  }
}
