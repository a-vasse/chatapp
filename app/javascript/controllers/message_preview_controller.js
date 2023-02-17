import { Controller } from "@hotwired/stimulus";

/**
 * This controller is responsible for displaying the message preview.
 * @class MessagePreviewController
 */

export default class extends Controller {
  connect() {
    console.log("message preview controller connected")
  }
  /**
   * Creates the preview panel displayed above the message input.
   */
  preview() {
    this.clearPreviews();
    for (let i = 0; i < this.targets.element.files.length; i++) {
      let file = this.targets.element.files[i];
      const reader = new FileReader();
      this.createDisplayPreviewElements(file, reader);
    }
    this.toggleVisibility();
  }

  /**
   * Toggles visibility of preview div
   */

  toggleVisibility() {
    let preview = document.getElementById("attachment-previews")
    preview.classList.toggle("display-none");
  }

  /**
   * Creates and displays the preview elements for the file.
   *
   * @param {*} file - The file to be previewed
   * @param {*} reader - The FileReader object
   */
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

  /**
   * Constructs the preview element for the file.
   * These elements are used to display the file in the message preview.
   *
   * @param {*} file - The file to be previewed
   * @param {*} reader - The FileReader object
   * @returns {HTMLElement} - The element to be added to the DOM
   */
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
          element = this.createVideoElement(cancelFunction);
          break;
      case "audio/mpeg":
      case "audio/mp3":
      case "audio/wav":
        element = this.createAudioElement(cancelFunction);
        break;
      default:
        element = this.createDefaultElement(cancelFunction);
      }
      element.dataset.filename = file.name;
      return element;
  }

  /**
   * Create an image preview element.
   * @param {*} cancelFunction - The function to be called when the cancel button is clicked
   * @param {*} reader - The FileReader object
   * @returns {HTMLElement} - The element to be added to the DOM
   */
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
    cancelUploadButton.appendChild(document.createTextNode("-"));
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  /**
   * Creates a preview element for audio files.
   * This is used for audio files that are of type: mp3, or wav.
   * @param {*} cancelFunction - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createAudioElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.appendChild(document.createTextNode("-"));
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  /**
   * Creates a video preview element.
   * @param {*} cancelFunction - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createVideoElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add( "cancel-upload-button");
    cancelUploadButton.appendChild(document.createTextNode("-"));
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }
  /**
   * Creates the element for a default file type. This is used for files that
   * are (probably) not images, videos, or audio.
   * @param {*} cancelFunction - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createDefaultElement(cancelFunction) {
    let cancelUploadButton, element;
    element = document.createElement("i");
    element.classList.add("file-removal");
    cancelUploadButton = document.createElement("i");
    cancelUploadButton.classList.add("cancel-upload-button");
    cancelUploadButton.appendChild(document.createTextNode("-"));
    cancelUploadButton.onclick = cancelFunction;
    element.appendChild(cancelUploadButton);
    return element;
  }

  /**
   * Remove the selected preview element.
   * Uses a dataTransfer to circumvent fileList limitations
   * @param {Event} e - The event object
   */
  removePreview(event) {
    const target = event.target.parentNode.closest(".attachment-preview");
    const dataTransfer = new DataTransfer();
    let fileInput = document.getElementById("message_attachments");
    let files = fileInput.files;
    let filesArray = Array.from(files);

    filesArray = filesArray.filter((file) => {
      let filename = target.dataset.filename;
      return file.name !== filename;
    });
    target.parentNode.removeChild(target);
    filesArray.forEach((file) => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    if (filesArray.length === 0) {
      this.toggleVisibility();
    }
  }

  /**
   * Clear all the preview elements after submit
   */
  clearPreviews() {
    document.getElementById("attachment-previews").innerHTML = "";

    let preview = document.getElementById("attachment-previews")
    preview.classList.add("display-none");
  }
}
