interface OptionItem {
  value: string;
  label: string;
}

class CustomSelect extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "value", "options", "multiple"];
  }

  private select: HTMLSelectElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.select = document.createElement("select");
    shadow.appendChild(this.select);

    this.select.addEventListener("input", () => {
      this.value = this.select.value;
      this.dispatchEvent(new Event("input"));
    });
    this.select.addEventListener("change", () => {
      this.dispatchEvent(new Event("change"));
    });
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  set disabled(val: boolean) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
    this.select.disabled = val;
  }

  get value(): string {
    return this.select.value;
  }
  set value(val: string) {
    this.setAttribute("value", val);
    this.select.value = val;
  }

  get multiple(): boolean {
    return this.hasAttribute("multiple");
  }
  set multiple(val: boolean) {
    if (val) this.setAttribute("multiple", "");
    else this.removeAttribute("multiple");
    this.select.multiple = val;
  }

  get options(): OptionItem[] {
    const raw = this.getAttribute("options");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  set options(val: OptionItem[]) {
    this.setAttribute("options", JSON.stringify(val));
    this.renderOptions();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "disabled":
        this.select.disabled = this.disabled;
        break;
      case "value":
        this.select.value = this.value;
        break;
      case "multiple":
        this.select.multiple = this.multiple;
        break;
      case "options":
        this.renderOptions();
        break;
    }
  }

  connectedCallback() {
    this.select.disabled = this.disabled;
    this.select.multiple = this.multiple;
    this.renderOptions();
    this.select.value = this.value;
  }

  renderOptions() {
    this.select.innerHTML = "";
    this.options.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      this.select.appendChild(optionEl);
    });
  }
}
customElements.define("custom-select", CustomSelect);
export {};