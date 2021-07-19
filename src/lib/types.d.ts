export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImages>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}
export interface OpenGraphImages {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}
export interface OpenGraphVideos {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  secureUrl?: string;
  type?: string;
}
export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}
export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

export interface Twitter {
  cardType?: string;
  site?: string;
  handle?: string;
}

export interface Facebook {
  appId?: string;
}

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
  maxImagePreview?: ImagePrevSize;
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}

export type ImagePrevSize = 'none' | 'standard' | 'large';
