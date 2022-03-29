import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class ItemView extends LitElement {
  @property({ type: String }) story = '';

  render() {
    return html`
      ${this.story === '' ? html`<div>No details</div>` : this.story}
    `;
  }
}
