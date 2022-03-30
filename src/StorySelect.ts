import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class StorySelect extends LitElement {
  @property({ type: String }) selectedStory = 'top';

  @property({ type: Array }) stories = ['Top', 'New', 'Best', 'Ask', 'Show'];

  static styles = css`
    .storySelect {
      font-size: 14px;
      margin: 20px 0;
    }
    select {
      margin-left: 5px;
      padding: 8px;
      width: 100px;
    }
  `;

  handleChange(event: Event) {
    const story = event.target as HTMLSelectElement;
    this.selectedStory = story.value;
    this.dispatchEvent(
      new CustomEvent('story-type-change', {
        bubbles: true,
        detail: story.value,
      })
    );
  }

  render() {
    return html`
      <div class="storySelect">
        <label for="storyType">Select story category</label>
        <select name="storyType" id="storyType" @change=${this.handleChange}>
          ${this.stories.map(
            story => html`<option value=${story}>${story}</option>`
          )}
        </select>
      </div>
    `;
  }
}
