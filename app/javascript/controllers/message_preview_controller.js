import { Controller } from "@hotwired/stimulus";

/* controller respoinsible for displaying preview messages */

export default class extends Controller {
  connect() {}

  /* creates the preview panel displayed above the message input */
  preview() {
    this.clearPreviews();
    for (let i = 0; i < this.targets.element.files.length; i++) {
      let file = this.targets.element.files[i];
      const reader = new FileReader();
      this.createDisplayPreviewElements(file, reader);
    }
  }

  /* creates and displays preview elements */
  createDisplayPreviewElements(file, reader) {
    reader.onload = () => {
      let element = this.constructPreviews(file, reader);
    }
  }

  /* construct the preview element for the file */
  constructPreviews(file, reader) {
    let element;
    let cancelFunction = (e) => this.removePreview(e);
    switch (file.type) {
      case "image/jpeg":
      case "image/jpeg":
      case "image/jpeg":
        element = this.createImageElement(cancelFunction, reader);
        break;
    }
  }

  /* creates an image preview element */
  createImageElement(cancelFunction, reader) {
    let cancelUploadButton, element;
    const image = document.createElement("img");
    
  }
}
