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
      element.src = reader.result;
      element.setAttribute("href", reader.result);
      element.setAttribute("target", "_blank");
      element.classList.add("attachment-preview");
      document.getElementById("attachment-previews").appendChild(element);
    };
    reader.readAsDataURL(file);
  }

  /* construct the preview element for the file */
  constructPreviews(file, reader) {
    let element;
    let cancelFunction = (e) => this.removePreview(e);
    switch (file.type) {
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        element = this.createImageElement(cancelFunction, reader);
        break;
      case "video/mp4":
      case "video/quicktime":
        element = this.createVideoElement(cancelFunction, reader);
        break;
      case "audio/mpeg":
      case "audio/mp3":
      case "audio/wav":
        element = this.createAudioElement(cancelFunction, reader);
        break;
      default:
        element = this.createDefaultElement(cancelFunction, reader);
    }
    element.dataset.filename = file.name;
    return element;
  }

  /* creates an image preview element */
  createImageElement(cancelFunction, reader) {
    let cancelUploadButton, element;
    const image = document.createElement("img");
    image.setAttribute("style", "background-image: url(" + reader.result + ")");
    image.classList.add("preview-image");
    element = document.createElement("div");
    element.classList.add("attachment-image-container", "file-removal");
    element.appendChild(image);
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  /* creates an audio preview element */
  createAudioElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("audio-preview-icon", "file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  createVideoElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("video-preview-icon", "file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  createDefaultElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("file-preview-icon", "file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }
}
