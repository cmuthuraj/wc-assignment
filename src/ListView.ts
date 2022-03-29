import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './item-view.js';

export class ListView extends LitElement {
  @property({ type: String }) storyType = 'Top';

  @property({ type: Array }) stories: any[] = [];

  @property({ type: String }) selectedStory = '';

  static styles = css`
    :host {
      max-width: 960px;
      margin: 0 auto;
      text-align: left;
    }

    .list-item {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
      padding: 8px 0;
      color: black;
    }

    .list-item--description {
      font-size: 12px;
      padding-left: 15px;
      font-weight: 300;
    }

    button {
      border: none;
      background-color: transparent;
      color: #ff6200;
      padding-left: 15px;
    }

    @media only screen and (max-width: 600px) {
      .story-type,
      .list-item {
        width: auto;
        margin: 0 30px;
      }
    }
  `;

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

  handleStoryClick = (story: any) => {
    this.selectedStory = story.id;
    this.dispatchEvent(
      new CustomEvent('story-clicked', {
        detail: { story },
      })
    );

    // TODO: Fetch kids items for that story and display the details
  };

  render() {
    return html`
      <div class="story-type">${this.storyType} Stories</div>
      ${this.stories.map(
        (story, index) =>
          html`<div class="list-item">
            <div class="list-item--title">${index + 1}. ${story.title}</div>
            <div class="list-item--description">
              ${story.score} points by ${story.by}
            </div>
            <button @click=${() => this.handleStoryClick(story)}>
              Show Details
            </button>
          </div>`
      )}
    `;
  }
}
