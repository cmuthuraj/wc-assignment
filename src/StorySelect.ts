import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class StorySelect extends LitElement {
  @property({ type: String }) selectedStory = 'top';

  @property({ type: Array }) stories = ['Top', 'New', 'Best', 'Ask', 'Show'];

  handleChange(event: Event) {
    const story = event.target as HTMLSelectElement;
    this.selectedStory = story.value;
  }

  render() {
    return html`
      <div class="storySelect">
        <select name="storyType" id="storyType" @change=${this.handleChange}>
          ${this.stories.map(
            story => html`<option value=${story}>${story}</option>`
          )}
        </select>
      </div>
    `;
  }
}
