import { SvelteComponentTyped } from 'svelte';
import { Thing, WithContext } from 'schema-dts';
import {
  AdditionalRobotsProps,
  MobileAlternate,
  LanguageAlternate,
  Twitter,
  Facebook,
  OpenGraph,
  MetaTag,
  LinkTag
} from './types';

export interface MetaTagsProps {
  title?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  twitter?: Twitter;
  facebook?: Facebook;
  openGraph?: OpenGraph;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  jsonLd?: Thing | WithContext<Thing>;
}

export default class MetaTags extends SvelteComponentTyped<MetaTagsProps> {}
