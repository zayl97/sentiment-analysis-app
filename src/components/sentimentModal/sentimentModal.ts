import negativeIcon from "../../images/negative.svg";
import neutralIcon from "../../images/neutral.svg";
import positiveIcon from "../../images/positive.svg";

console.log(negativeIcon, neutralIcon, positiveIcon);

class SentimentModal extends HTMLElement {
  label: string;
  private modal?: HTMLDivElement;
  private closeButton?: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.label = this.getAttribute('label') || 'Neutral';
    this.render();
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'label' && newValue !== null) {
      this.label = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
  }

  getIcon() {
    switch (this.label) {
      case "POSITIVE":
        return positiveIcon;
      case "NEGATIVE":
        return negativeIcon;
      default:
        return neutralIcon;
    }
  }

  getMessage() {
    const messages: Record<string, string> = {
      NEGATIVE: 'The sentiment is negative. Please review the content.',
      NEUTRAL: 'The sentiment is neutral. No strong emotions detected.',
      POSITIVE: 'The sentiment is positive. Great job!'
    };
    return messages[this.label] || messages['Neutral'];
  }

  showModal() {
    this.removeAttribute("hidden");
  }

  hideModal() {
    this.setAttribute("hidden", "true");
  }

  render() {
    this.shadowRoot!.innerHTML = `
        <div class="modal" part="modal">
            <div class="modal-content" part="content">
                <button class="modal-close" part="close">&times;</button>
                <img part="icon" src="${this.getIcon()}" alt="${this.label} icon">
                <p>${this.getMessage()}</p>
            </div>
        </div>
    `;

    this.modal = this.shadowRoot!.querySelector('.modal') as HTMLDivElement;
    this.closeButton = this.shadowRoot!.querySelector('.modal-close') as HTMLButtonElement;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.cleanupEventListeners();

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.hideModal.bind(this));
    }

    if (this.modal) {
      this.modal.addEventListener('click', (event) => {
        if (event.target === this.modal) this.hideModal();
      });
    }
  }

  private cleanupEventListeners() {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.hideModal.bind(this));
    }

    if (this.modal) {
      this.modal.removeEventListener('click', (event) => {
        if (event.target === this.modal) this.hideModal();
      });
    }
  }
}

customElements.define('sentiment-modal', SentimentModal);
