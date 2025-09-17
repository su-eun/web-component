class CustomButton extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "fill", "title", "round"];
  }

  private button: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    shadow.appendChild(this.button);

    this.button.addEventListener("click", (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new Event("click"));
    });
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  set disabled(val: boolean) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
    this.button.disabled = val;
  }

  get fill(): boolean {
    return this.hasAttribute("fill");
  }
  set fill(val: boolean) {
    if (val) this.setAttribute("fill", "");
    else this.removeAttribute("fill");
    this.updateStyle();
  }

  get title(): string {
    return this.getAttribute("title") || "";
  }
  set title(val: string) {
    this.setAttribute("title", val);
    this.button.textContent = val;
  }

  get round(): boolean {
    return this.hasAttribute("round");
  }
  set round(val: boolean) {
    if (val) this.setAttribute("round", "");
    else this.removeAttribute("round");
    this.updateStyle();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "disabled":
        this.button.disabled = this.disabled;
        break;
      case "fill":
      case "round":
        this.updateStyle();
        break;
      case "title":
        this.button.textContent = this.title;
        break;
    }
  }

  connectedCallback() {
    this.button.textContent = this.title;
    this.button.disabled = this.disabled;
    this.updateStyle();
  }

  updateStyle() {
    this.button.style.backgroundColor = this.fill ? "#1976d2" : "";
    this.button.style.color = this.fill ? "#fff" : "";
    this.button.style.borderRadius = this.round ? "50%" : "";
  }
}
customElements.define("custom-button", CustomButton);
export {};