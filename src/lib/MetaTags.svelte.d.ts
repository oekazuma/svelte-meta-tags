import { SvelteComponentTyped } from 'svelte';
import { Thing, WithContext } from 'schema-dts';
import { OpenGraph, Twitter, Facebook } from './types';

export interface MetaTagsProps {
  robots?: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  twitter?: Twitter;
  facebook?: Facebook;
  openGraph?: OpenGraph;
  jsonLd?: Thing | WithContext<Thing>;
}

export default class MetaTags extends SvelteComponentTyped<
  MetaTagsProps,
  Record<string, never>,
  Record<string, never>
> {}
