/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';
import { Thing, WithContext } from 'schema-dts';
import { OpenGraph, Twitter } from './@types/MetaTags';

export interface MetaTagsProps {
  title?: string;
  noindex?: boolean;
  nofollow?: boolean;
  description?: string;
  keywords?: string;
  canonical?: string;
  openGraph?: OpenGraph;
  twitter?: Twitter;
  jsonLd?: Thing | WithContext<Thing>;
}

export default class MetaTags extends SvelteComponentTyped<MetaTagsProps, {}, {}> {}
