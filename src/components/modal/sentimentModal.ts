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
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'label') {
        this.label = newValue;
        this.render();
      }
    }
  
    getMessage() {
      const messages = {
        Negative: 'The sentiment is negative. Please review the content.',
        Neutral: 'The sentiment is neutral. No strong emotions detected.',
        Positive: 'The sentiment is positive. Great job!'
      };
      return messages[this.label] || messages['Neutral'];
    }
  
    render() {
      this.shadowRoot!.innerHTML = `
        <style>
          .modal {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 400px;
            position: relative;
          }
          .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }
          .modal-close:hover {
            color: red;
          }
        </style>
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