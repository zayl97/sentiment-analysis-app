import negativeIcon from "../../images/negative.svg";
import neutralIcon from "../../images/neutral.svg";
import positiveIcon from "../../images/positive.svg";

console.log(negativeIcon, neutralIcon, positiveIcon);
class SentimentModal extends HTMLElement {
  label: string;

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

  getIcon() {
    switch (this.label) {
      case "Positive":
        return positiveIcon;
      case "Negative":
        return negativeIcon;
      default:
        return neutralIcon;
    }
  }

  getMessage() {
    const messages: Record<string, string> = {
      Negative: 'The sentiment is negative. Please review the content.',
      Neutral: 'The sentiment is neutral. No strong emotions detected.',
      Positive: 'The sentiment is positive. Great job!'
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

    const modal = this.shadowRoot!.querySelector('.modal') as HTMLDivElement;
    const closeButton = this.shadowRoot!.querySelector('.modal-close') as HTMLButtonElement;

    closeButton.addEventListener('click', () => this.hideModal());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) this.hideModal();
    });
  }
}

customElements.define('sentiment-modal', SentimentModal);
