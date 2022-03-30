import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './item-view.js';

export class ListView extends LitElement {
  @property({ type: String }) storyType = 'Top';

  @property({ type: Array }) stories: any[] = [];

  @property({ type: Object }) selectedStory: any;

  static styles = css`
    :host {
      max-width: 960px;
      margin: 0 auto;
      text-align: left;
    }
  `;

  static async fetchData(type: string, value: string) {
    let apiUrl = 'https://hacker-news.firebaseio.com/v0/';
    apiUrl +=
      type === 'list'
        ? `${value.toLowerCase()}stories.json`
        : `item/${value}.json`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => data);
  }

  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('storyType')) {
      const oldValue = changedProperties.get('storyType') as string;
      const newValue = this.storyType;
      if (oldValue !== newValue) {
        fetch(
          `https://hacker-news.firebaseio.com/v0/${this.storyType.toLowerCase()}stories.json`
        )
          .then(response => response.json())
          .then(data => {
            this.stories = [];
            const result = data.slice(0, 9);
            result.forEach((id: string, index: number) => {
              fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then(response => response.json())
                .then(item => {
                  this.stories.push(item);
                  if (index === result.length - 1) {
                    super.update(changedProperties);
                  }
                });
            });
          });
      }
    }
  }

  render() {
    return html`
      ${this.stories.map(
        story => html` <item-view .story=${story}></item-view> `
      )}
    `;
  }
}
