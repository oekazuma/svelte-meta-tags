import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { metaContent, metaContents, metaTags, renderHead } from '../helpers/head';

describe('og:type profile', () => {
  test('renders every profile field', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        type: 'profile',
        profile: { firstName: 'First', lastName: 'Last', username: 'user', gender: 'female' }
      }
    });

    expect(metaContent(rendered, 'profile:first_name')).toBe('First');
    expect(metaContent(rendered, 'profile:last_name')).toBe('Last');
    expect(metaContent(rendered, 'profile:username')).toBe('user');
    expect(metaContent(rendered, 'profile:gender')).toBe('female');
  });

  test('renders no profile fields when the profile object is missing', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'profile' } });

    expect(metaContent(rendered, 'og:type')).toBe('profile');
    expect(metaTags(rendered, 'profile:first_name')).toHaveLength(0);
  });
});

describe('og:type book', () => {
  test('renders every book field, repeating authors and tags', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        type: 'book',
        book: {
          authors: ['https://a.test/authors/a', 'https://a.test/authors/b'],
          isbn: '978-3-16-148410-0',
          releaseDate: '2018-09-17T11:08:13Z',
          tags: ['Tag A', 'Tag B']
        }
      }
    });

    expect(metaContents(rendered, 'book:author')).toEqual(['https://a.test/authors/a', 'https://a.test/authors/b']);
    expect(metaContent(rendered, 'book:isbn')).toBe('978-3-16-148410-0');
    expect(metaContent(rendered, 'book:release_date')).toBe('2018-09-17T11:08:13Z');
    expect(metaContents(rendered, 'book:tag')).toEqual(['Tag A', 'Tag B']);
  });

  test('tolerates a book without authors or tags', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'book', book: { isbn: '1' } } });

    expect(metaContent(rendered, 'book:isbn')).toBe('1');
    expect(metaTags(rendered, 'book:author')).toHaveLength(0);
  });
});

describe('og:type article', () => {
  test('renders every article field, repeating authors and tags', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        type: 'article',
        article: {
          publishedTime: '2021-01-01T00:00:00Z',
          modifiedTime: '2021-02-01T00:00:00Z',
          expirationTime: '2022-01-01T00:00:00Z',
          authors: ['https://a.test/authors/a'],
          section: 'Section II',
          tags: ['Tag A', 'Tag B']
        }
      }
    });

    expect(metaContent(rendered, 'article:published_time')).toBe('2021-01-01T00:00:00Z');
    expect(metaContent(rendered, 'article:modified_time')).toBe('2021-02-01T00:00:00Z');
    expect(metaContent(rendered, 'article:expiration_time')).toBe('2022-01-01T00:00:00Z');
    expect(metaContents(rendered, 'article:author')).toEqual(['https://a.test/authors/a']);
    expect(metaContent(rendered, 'article:section')).toBe('Section II');
    expect(metaContents(rendered, 'article:tag')).toEqual(['Tag A', 'Tag B']);
  });
});

describe('og:type video', () => {
  const video = {
    actors: [
      { profile: 'https://a.test/actors/a', role: 'Protagonist' },
      { profile: 'https://a.test/actors/b', role: 'Antagonist' }
    ],
    directors: ['https://a.test/directors/a'],
    writers: ['https://a.test/writers/a'],
    duration: 680000,
    releaseDate: '2022-12-21T22:04:11Z',
    tags: ['Tag A'],
    series: 'The Example Series'
  };

  test('renders every video field for video.movie', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'video.movie', video } });

    expect(metaContents(rendered, 'video:actor')).toEqual(['https://a.test/actors/a', 'https://a.test/actors/b']);
    expect(metaContents(rendered, 'video:actor:role')).toEqual(['Protagonist', 'Antagonist']);
    expect(metaContents(rendered, 'video:director')).toEqual(['https://a.test/directors/a']);
    expect(metaContents(rendered, 'video:writer')).toEqual(['https://a.test/writers/a']);
    expect(metaContent(rendered, 'video:duration')).toBe('680000');
    expect(metaContent(rendered, 'video:release_date')).toBe('2022-12-21T22:04:11Z');
    expect(metaContents(rendered, 'video:tag')).toEqual(['Tag A']);
    expect(metaContent(rendered, 'video:series')).toBe('The Example Series');
  });

  test.each(['video.episode', 'video.tv_show', 'video.other'])('renders the video block for %s', (type) => {
    const rendered = renderHead(MetaTags, { openGraph: { type, video } });

    expect(metaContent(rendered, 'og:type')).toBe(type);
    expect(metaContent(rendered, 'video:series')).toBe('The Example Series');
  });

  test('renders a partial video block', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: { type: 'video.other', video: { directors: ['https://a.test/directors/a'], series: 'The Series' } }
    });

    expect(metaContents(rendered, 'video:director')).toEqual(['https://a.test/directors/a']);
    expect(metaContent(rendered, 'video:series')).toBe('The Series');
    expect(metaTags(rendered, 'video:actor')).toHaveLength(0);
  });

  test('video.other without a video object renders no video fields', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'video.other' } });

    expect(metaContent(rendered, 'og:type')).toBe('video.other');
    expect(metaTags(rendered, 'video:series')).toHaveLength(0);
  });

  // The guard for video.movie / video.episode / video.tv_show does not require
  // `openGraph.video`, unlike the one for video.other. This locks in that the
  // asymmetry is at least survivable.
  test.each(['video.movie', 'video.episode', 'video.tv_show'])(
    '%s without a video object renders no video fields',
    (type) => {
      const rendered = renderHead(MetaTags, { openGraph: { type } });

      expect(metaContent(rendered, 'og:type')).toBe(type);
      expect(metaTags(rendered, 'video:series')).toHaveLength(0);
    }
  );
});

describe('og:type dispatch', () => {
  test('an unknown type renders og:type only', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'music.song' } });

    expect(metaContent(rendered, 'og:type')).toBe('music.song');
    expect(rendered.tags.filter((tag) => tag.attrs.property?.startsWith('music:'))).toHaveLength(0);
  });

  test('type matching is case-insensitive', () => {
    const rendered = renderHead(MetaTags, { openGraph: { type: 'Article', article: { section: 'Section II' } } });

    expect(metaContent(rendered, 'og:type')).toBe('article');
    expect(metaContent(rendered, 'article:section')).toBe('Section II');
  });
});
