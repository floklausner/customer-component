class ListComponent extends HTMLElement {

  #text
  #detailText
  #evenMoreDetailedText
  #email

  static get observedAttributes() {
    return [ 'text' , 'detailtext', 'evenmoredetailedtext', 'email' ];
  }

  constructor() {
    super();
    console.log('ListComponent constructor');
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('connected');

    const span = document.createElement('span');
    span.innerText = this.#text;
    this.shadowRoot.appendChild(span);

    this.shadowRoot.addEventListener('click', () => {
      console.log('i was clicked', this);
      const event = new CustomEvent('list-item-clicked', { detail:
            { detailtext: this.#detailText, evenmoredetailedtext: this.#evenMoreDetailedText, email: this.#email } });
      this.dispatchEvent(event);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attribute ${name} changed to ${newValue}`);

    switch (name) {
      case 'text':
        this.#text = newValue;
        break;
      case 'detailtext':
        this.#detailText = newValue;
        break;
      case 'evenmoredetailedtext':
        this.#evenMoreDetailedText = newValue;
        break;
      case 'email':
        this.#email = newValue;
        break;
    }
  }

}

customElements.define('list-component', ListComponent);
