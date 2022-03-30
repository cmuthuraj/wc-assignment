import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { WcAssignment } from '../src/WcAssignment.js';
import '../src/wc-assignment.js';

describe('WcAssignment', () => {
  let element: WcAssignment;
  beforeEach(async () => {
    element = await fixture(html`<wc-assignment></wc-assignment>`);
  });

  it('renders a h3', () => {
    const h3 = element.shadowRoot!.querySelector('h3')!;
    expect(h3).to.exist;
    expect(h3.textContent).to.equal('ING front-end assignment');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
