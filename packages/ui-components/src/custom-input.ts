class CustomInput extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "value", "placeholder", "type", "maxlength"];
  }

  private input: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.input = document.createElement("input");
    this.input.type = "text";
    shadow.appendChild(this.input);

    this.input.addEventListener("input", (e) => {
      this.value = this.input.value;
      this.dispatchEvent(new Event("input"));
    });
    this.input.addEventListener("change", () => {
      this.dispatchEvent(new Event("change"));
    });
    this.input.addEventListener("focus", () => {
      this.dispatchEvent(new Event("focus"));
    });
    this.input.addEventListener("blur", () => {
      this.dispatchEvent(new Event("blur"));
    });
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  set disabled(val: boolean) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
    this.input.disabled = val;
  }

  get value(): string {
    return this.getAttribute("value") || "";
  }
  set value(val: string) {
    this.setAttribute("value", val);
    this.input.value = val;
  }

  get placeholder(): string {
    return this.getAttribute("placeholder") || "";
  }
  set placeholder(val: string) {
    this.setAttribute("placeholder", val);
    this.input.placeholder = val;
  }

  get type(): string {
    return this.getAttribute("type") || "text";
  }
  set type(val: string) {
    this.setAttribute("type", val);
    this.input.type = val;
  }

  get maxlength(): number | null {
    const v = this.getAttribute("maxlength");
    return v ? Number(v) : null;
  }
  set maxlength(val: number | null) {
    if (val !== null) this.setAttribute("maxlength", val.toString());
    else this.removeAttribute("maxlength");
    this.input.maxLength = val ?? -1;
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "disabled":
        this.input.disabled = this.disabled;
        break;
      case "value":
        if (this.input.value !== this.value) this.input.value = this.value;
        break;
      case "placeholder":
        this.input.placeholder = this.placeholder;
        break;
      case "type":
        this.input.type = this.type;
        break;
      case "maxlength":
        this.input.maxLength = this.maxlength ?? -1;
        break;
    }
  }

  connectedCallback() {
    this.input.disabled = this.disabled;
    this.input.value = this.value;
    this.input.placeholder = this.placeholder;
    this.input.type = this.type;
    this.input.maxLength = this.maxlength ?? -1;
  }
}
customElements.define("custom-input", CustomInput);
export {};