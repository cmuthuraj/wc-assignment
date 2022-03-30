import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './comment-view.js';

export class ItemView extends LitElement {
  @property({ type: Object }) story: any;

  @property({ type: Array }) comments: any[] = [];

  @property({ type: Boolean }) showComments = false;

  static styles = css`
    .story-item {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
      padding: 8px 0;
      color: black;
    }

    .story-type {
      font-size: 14px;
      margin-top: 30px;
    }

    .story-item--description {
      font-size: 12px;
      font-weight: 500;
    }

    button {
      border: none;
      background-color: transparent;
      color: #60a6da;
      padding: 0;
    }

    .comment-item {
      font-size: 12px;
      max-width: 400px;
      word-wrap: break-word;
      padding: 5px 0;
    }

    .comment-end {
      border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
    }

    .highlight {
      color: #ff6200;
    }

    @media only screen and (max-width: 600px) {
      .story-type,
      .story-item {
        width: auto;
        margin: 0 30px;
      }
    }
  `;

  handleStoryClick() {
    const { showComments } = this;
    this.showComments = !this.showComments;
    if (showComments) {
      this.comments = [];
      this.requestUpdate();
    } else {
      const storyComments = this.story?.kids;
      this.comments = [];
      storyComments?.forEach((id: string) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(response => response.json())
          .then(item => {
            this.comments.push(item);
            this.requestUpdate();
          });
      });
    }
  }

  renderComments() {
    if (!this.showComments) return null;
    return this.comments.length > 0
      ? this.comments.map(
          comment => html` <comment-view .comment=${comment}></comment-view> `
        )
      : html`<comment-view></comment-view>`;
  }

  render() {
    return html` <div class="story-item">
      <div class="story-item--title">${this.story.title}</div>
      <div class="story-item--description">
        ${this.story.score} points by ${this.story.by}
      </div>
      <button @click=${this.handleStoryClick}>
        ${this.showComments ? 'Hide Details' : 'Show Details'}
      </button>
      <div class="comment-list">${this.renderComments()}</div>
    </div>`;
  }
}
