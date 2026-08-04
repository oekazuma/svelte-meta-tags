import { render } from 'svelte/server';
import type { Component } from 'svelte';

export interface RenderedTag {
  tag: string;
  attrs: Record<string, string>;
}

export interface Rendered {
  title: string | undefined;
  tags: RenderedTag[];
  jsonLd: string[];
  html: string;
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

const unescape = (value: string) => value.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity]);

/**
 * Svelte's SSR output interleaves hydration markers with the real markup.
 * They carry no meaning for a `<head>` assertion, so drop them before parsing.
 */
const stripMarkers = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '');

const parseAttrs = (raw: string) => {
  const attrs: Record<string, string> = {};

  for (const [, name, value] of raw.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:="([^"]*)")?/g)) {
    attrs[name] = value === undefined ? '' : unescape(value);
  }

  return attrs;
};

/**
 * Svelte escapes `&`, `"` and `<` inside attribute values but leaves `>` raw,
 * so the attribute region has to be scanned quote-aware rather than up to the
 * first `>`.
 */
const TAG = /<(meta|link)\b((?:[^>"]|"[^"]*")*?)\/?>/g;

const parse = (raw: string): Rendered => {
  const jsonLd = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    ([, json]) => json
  );
  const html = stripMarkers(raw.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, ''));
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];

  const tags = [...html.matchAll(TAG)].map(([, tag, attrs]) => ({ tag, attrs: parseAttrs(attrs) }));

  return { title: title === undefined ? undefined : unescape(title), tags, jsonLd, html };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderParts = (component: Component<any>, props: Record<string, unknown>) =>
  render(component, { props } as any) as { head: string; body: string };

/** Render a component and parse everything it put into `<svelte:head>`. */
export const renderHead = (component: Component<any>, props: Record<string, unknown> = {}): Rendered =>
  parse(renderParts(component, props).head);

/** Render a component and parse its inline (non-head) output. */
export const renderBody = (component: Component<any>, props: Record<string, unknown> = {}): Rendered =>
  parse(renderParts(component, props).body);
/* eslint-enable @typescript-eslint/no-explicit-any */

const keyOf = (tag: RenderedTag) => tag.attrs.name ?? tag.attrs.property;

/** All `content` values emitted for a meta `name`/`property`, in document order. */
export const metaContents = (rendered: Rendered, key: string): string[] =>
  rendered.tags.filter((tag) => tag.tag === 'meta' && keyOf(tag) === key).map((tag) => tag.attrs.content);

/** The single `content` value for a meta `name`/`property`, or `undefined` when the tag is absent. */
export const metaContent = (rendered: Rendered, key: string): string | undefined => metaContents(rendered, key)[0];

/** Every meta tag carrying a `name`/`property`, so a test can assert which attribute was used. */
export const metaTags = (rendered: Rendered, key: string): RenderedTag[] =>
  rendered.tags.filter((tag) => tag.tag === 'meta' && keyOf(tag) === key);

/** All `<link>` tags with the given `rel`. */
export const links = (rendered: Rendered, rel: string): RenderedTag[] =>
  rendered.tags.filter((tag) => tag.tag === 'link' && tag.attrs.rel === rel);
