export interface OpenGraph {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  article?: OpenGraphArticle;
  images?: OpenGraphImage[];
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  section?: string;
  authors?: string[];
  tags?: string[];
}

export interface OpenGraphImage {
  url: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export interface Twitter {
  cardType?: string;
  site?: string;
  handle?: string;
}
