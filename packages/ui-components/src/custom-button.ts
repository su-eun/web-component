class CustomButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'fill', 'title', 'round'];
  }

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // Handle attribute changes
  }

  handleClick() {
    const event = new CustomEvent('button-click', { detail: { title: this.getAttribute('title') } });
    this.dispatchEvent(event);
  }
}

customElements.define('custom-button', CustomButton);
