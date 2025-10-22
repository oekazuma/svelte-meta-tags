import { Thing, WithContext } from 'schema-dts';

type WithInputOutputProperties<T> = T & {
  [K in `${string}${'input' | 'output'}`]?: string;
};

type JsonLdSchema = Record<string, unknown> & {
  '@type'?: string | readonly string[];
  '@context'?: string | Record<string, unknown> | readonly (string | Record<string, unknown>)[];
  '@id'?: string;
};

type FlexibleSchema =
  | JsonLdSchema
  | (Thing & Record<string, unknown>)
  | (WithContext<Thing> & Record<string, unknown>)
  | WithContext<Thing>;

export interface MobileAlternate {
  media: string;
  href: string;
}

export interface LanguageAlternate {
  hrefLang: string;
  href: string;
}

export interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}

/**
 * Twitter card types
 * @see https://developer.x.com/en/docs/x-for-websites/cards/overview/markup
 */
export interface Twitter {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  title?: string;
  description?: string;
  creator?: string;
  creatorId?: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
  appNameIphone?: string;
  appIdIphone?: string;
  appUrlIphone?: string;
  appNameIpad?: string;
  appIdIpad?: string;
  appUrlIpad?: string;
  appNameGoogleplay?: string;
  appIdGoogleplay?: string;
  appUrlGoogleplay?: string;
}

export interface Facebook {
  appId?: string;
}

export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImage>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  audio?: ReadonlyArray<OpenGraphAudio>;
  locale?: string;
  siteName?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}

interface OpenGraphImage {
  url: string;
  secureUrl?: string;
  type?: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface OpenGraphVideos {
  url: string;
  secureUrl?: string;
  type?: string;
  width?: number;
  height?: number;
}

interface OpenGraphAudio {
  url: string;
  secureUrl?: string;
  type?: string;
}

interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

interface BaseMetaTag {
  content: string;
}

interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
  httpEquiv?: undefined;
}

interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
  httpEquiv?: undefined;
}

interface HTTPEquivMetaTag extends BaseMetaTag {
  httpEquiv: 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
  name?: undefined;
  property?: undefined;
}

export type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

export interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  title?: string;
  media?: string;
  sizes?: string;
  type?: string;
  color?: string;
  imagesrcset?: string;
  imagesizes?: string;
  integrity?: string;
  as?:
    | 'fetch'
    | 'audio'
    | 'audioworklet'
    | 'document'
    | 'embed'
    | 'font'
    | 'frame'
    | 'iframe'
    | 'image'
    | 'json'
    | 'manifest'
    | 'object'
    | 'paintworklet'
    | 'report'
    | 'script'
    | 'serviceworker'
    | 'sharedworker'
    | 'style'
    | 'track'
    | 'video'
    | 'webidentity'
    | 'worker'
    | 'xslt';
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: ReferrerPolicy;
}

export interface MetaTagsProps {
  title?: string;
  titleTemplate?: string;
  robots?: string | boolean;
  additionalRobotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  twitter?: Twitter;
  facebook?: Facebook;
  openGraph?: OpenGraph;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  keywords?: ReadonlyArray<string>;
}

interface GraphWrappedThing {
  '@graph': WithInputOutputProperties<FlexibleSchema>[];
}

export interface JsonLdProps {
  output?: 'head' | 'body';
  schema?:
    | FlexibleSchema
    | WithInputOutputProperties<FlexibleSchema>
    | FlexibleSchema[]
    | WithInputOutputProperties<FlexibleSchema>[]
    | GraphWrappedThing;
}
