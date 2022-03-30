import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './story-select.js';
import './list-view.js';

export class WcAssignment extends LitElement {
  @property({ type: String }) title = 'ING front-end assignment';

  @property({ type: String }) selectedStory = 'Top';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      font-family: 'Roboto', sans-serif;
    }

    main {
      flex-grow: 1;
    }

    h3 {
      color: #ff6200;
    }
  `;

  handleChange(event: CustomEvent) {
    this.selectedStory = event.detail;
  }

  render() {
    return html`
      <main>
        <h3>${this.title}</h3>
        <story-select @story-type-change=${this.handleChange}></story-select>
        <list-view .storyType=${this.selectedStory}></list-view>
      </main>
    `;
  }
}
