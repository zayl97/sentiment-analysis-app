class SentimentModal extends HTMLElement {
    label: string = "Neutral";

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
  
    getMessage() {
      const messages: Record<string, string> = {
        Negative: 'The sentiment is negative. Please review the content.',
        Neutral: 'The sentiment is neutral. No strong emotions detected.',
        Positive: 'The sentiment is positive. Great job!'
      };
      return messages[this.label] || messages['Neutral'];
    }
  
    render() {
      this.shadowRoot!.innerHTML = `
        <div class="modal">
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <p>${this.getMessage()}</p>
          </div>
        </div>
      `;
  
      this.shadowRoot!.querySelector('.modal-close')!.addEventListener('click', () => {
        this.remove();
      });
    }
  }
  
  customElements.define('sentiment-modal', SentimentModal);