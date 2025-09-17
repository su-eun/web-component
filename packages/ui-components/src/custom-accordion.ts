class CustomAccordion extends HTMLElement {
  static get observedAttributes() {
    return ["open", "title", "disabled"];
  }

  private wrapper: HTMLDivElement;
  private header: HTMLDivElement;
  private body: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.wrapper = document.createElement("div");
    this.header = document.createElement("div");
    this.body = document.createElement("div");

    this.header.addEventListener("click", () => {
      if (this.disabled) return;
      this.open = !this.open;
      this.dispatchEvent(new Event("toggle"));
    });

    this.wrapper.appendChild(this.header);
    this.wrapper.appendChild(this.body);
    shadow.appendChild(this.wrapper);
  }

  get open(): boolean {
    return this.hasAttribute("open");
  }
  set open(val: boolean) {
    if (val) this.setAttribute("open", "");
    else this.removeAttribute("open");
    this.body.style.display = val ? "block" : "none";
  }

  get title(): string {
    return this.getAttribute("title") || "";
  }
  set title(val: string) {
    this.setAttribute("title", val);
    this.header.textContent = val;
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  set disabled(val: boolean) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
    this.header.style.pointerEvents = val ? "none" : "auto";
    this.header.style.opacity = val ? "0.5" : "1";
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "open":
        this.body.style.display = this.open ? "block" : "none";
        break;
      case "title":
        this.header.textContent = this.title;
        break;
      case "disabled":
        this.header.style.pointerEvents = this.disabled ? "none" : "auto";
        this.header.style.opacity = this.disabled ? "0.5" : "1";
        break;
    }
  }

  connectedCallback() {
    this.header.textContent = this.title;
    this.body.style.display = this.open ? "block" : "none";
    this.header.style.pointerEvents = this.disabled ? "none" : "auto";
    this.header.style.opacity = this.disabled ? "0.5" : "1";
    // slot 지원
    this.body.innerHTML = "";
    const slot = document.createElement("slot");
    this.body.appendChild(slot);
  }
}
customElements.define("custom-accordion", CustomAccordion);
export {};