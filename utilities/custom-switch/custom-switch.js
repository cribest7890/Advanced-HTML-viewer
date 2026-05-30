class CustomSwitch extends HTMLElement {
  constructor() {
    super();
    // Creiamo la Shadow DOM per isolare CSS e HTML dal resto della pagina
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Leggiamo i testi dalle proprietà (attributi) HTML, impostando dei valori di default
    const textLabel = this.getAttribute('text') || 'ATTIVA';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .switch-input {
          display: none;
        }

        /* CAPSULA ESTERNA */
        .switch-label {
          display: flex;
          align-items: center;
          width: 180px; 
          height: 60px;
          background-color: var(--switch-bg-inactive, #e9e9eb);
          border-radius: 100px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                      background-color 0.4s ease;
        }

        /* TESTO INTERNO */
        .switch-text {
          font-size: 15px;
          font-weight: 600;
          color: var(--switch-text-color, #8e8e93);
          margin-left: 24px;
          white-space: nowrap;
          user-select: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        /* CAPSULA INTERNA (LA PILLOLA) */
        .inner-capsule {
          position: absolute;
          right: 6px; 
          width: 80px; 
          height: 48px;
          background-color: var(--capsule-bg-inactive, #d1d1d6); 
          border-radius: 100px;
          display: flex;
          align-items: center;
          padding: 4px;
          box-sizing: border-box;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                      background-color 0.4s ease;
        }

        /* IL PALLINO BIANCO */
        .switch-ball {
          width: 40px;
          height: 40px;
          background-color: var(--ball-color, white);
          border-radius: 50%;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* --- STATO ATTIVO --- */

        .switch-input:checked + .switch-label {
          background-color: var(--switch-bg-active, #007af5); 
          width: 92px; 
        }

        .switch-input:checked + .switch-label .switch-text {
          opacity: 0;
          transform: translateX(-20px);
        }

        .switch-input:checked + .switch-label .inner-capsule {
          background-color: var(--capsule-bg-active, #0056b3); 
        }

        .switch-input:checked + .switch-label .switch-ball {
          transform: translateX(32px); 
        }
      </style>

      <input type="checkbox" id="switch" class="switch-input">
      <label for="switch" class="switch-label">
        <span class="switch-text">${textLabel}</span>
        <div class="inner-capsule">
          <div class="switch-ball"></div>
        </div>
      </label>
    `;

    // Mettiamo in ascolto l'evento di cambio stato per poterlo intercettare all'esterno
    this.shadowRoot.querySelector('#switch').addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('switch-change', {
        detail: { checked: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });
  }
}

// Registriamo il tag personalizzato del componente
customElements.define('custom-switch', CustomSwitch);
