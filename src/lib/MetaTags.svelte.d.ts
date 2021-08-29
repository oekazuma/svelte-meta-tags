import { SvelteComponentTyped } from 'svelte';
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
}

export default class MetaTags extends SvelteComponentTyped<MetaTagsProps> {}
