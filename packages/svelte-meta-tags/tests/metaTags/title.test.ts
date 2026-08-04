import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { renderHead } from '../helpers/head';

describe('title and titleTemplate', () => {
  test('renders the title as given when no template is set', () => {
    expect(renderHead(MetaTags, { title: 'Home' }).title).toBe('Home');
  });

  test('substitutes %s with the title', () => {
    expect(renderHead(MetaTags, { title: 'Home', titleTemplate: '%s | MySite' }).title).toBe('Home | MySite');
  });

  test('substitutes every %s occurrence', () => {
    expect(renderHead(MetaTags, { title: 'Home', titleTemplate: '%s — %s' }).title).toBe('Home — Home');
  });

  test('inserts titles containing $& literally rather than as a replacement pattern', () => {
    expect(renderHead(MetaTags, { title: 'Rock $& Roll', titleTemplate: '%s | MySite' }).title).toBe(
      'Rock $& Roll | MySite'
    );
  });

  test("inserts titles containing $` and $' literally", () => {
    expect(renderHead(MetaTags, { title: "a $` b $' c", titleTemplate: '%s | MySite' }).title).toBe(
      "a $` b $' c | MySite"
    );
  });

  test('renders no title when title is missing, even with a template', () => {
    expect(renderHead(MetaTags, { titleTemplate: '%s | MySite' }).title).toBeUndefined();
  });

  test('renders no title when neither is set', () => {
    expect(renderHead(MetaTags, {}).title).toBeUndefined();
  });
});
