import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './story-select.js';
import './list-view.js';

export class WcAssignment extends LitElement {
  @property({ type: String }) title = 'ING front-end assignment';

  @property({ type: Array }) stories = ['Top', 'New', 'Best', 'Ask', 'Show'];

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

    select {
      padding: 10px;
      width: 100px;
    }
  `;

  handleChange(event: Event) {
    const story = event.target as HTMLSelectElement;
    this.selectedStory = story.value;
  }

  render() {
    return html`
      <main>
        <h3>${this.title}</h3>
        <div class="storySelect">
          <select name="storyType" id="storyType" @change=${this.handleChange}>
            ${this.stories.map(
              story => html`<option value=${story}>${story}</option>`
            )}
          </select>
        </div>
        <list-view .storyType=${this.selectedStory}></list-view>
      </main>
    `;
  }
}
