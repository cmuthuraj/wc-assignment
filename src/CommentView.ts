import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class CommentView extends LitElement {
  @property({ type: Object }) comment: any = {};

  static styles = css`
    .comment-item {
      font-size: 12px;
      max-width: 400px;
      word-wrap: break-word;
      padding: 5px 0;
    }

    .comment-end {
      color: rgba(0, 0, 0, 0.5);
      border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
    }

    .highlight {
      color: #ff6200;
    }
  `;

  render() {
    return html`<div class="comment-item">
      ${this.comment.id
        ? html`
          <div>
          <span class="highlight">${this.comment.by}</span> commented as
          </div>
          <div class="comment-end">${this.comment.text}</div>
        </div>`
        : html` <div class="comment-end">No comments...</div> `}
    </div>`;
  }
}
