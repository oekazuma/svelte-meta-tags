import type { MetaTagsProps } from './types';

/**
 * Creates a readonly, type-safe {@link MetaTagsProps} object specifically
 * designed for use in Svelte `+layout` files.
 *
 * This function creates an immutable wrapper around meta tags configuration
 * that serves as base meta tags for child pages. The returned object provides
 * a `props` getter to access the frozen meta tags configuration.
 *
 * @param obj - The base meta tags configuration object
 * @returns An instance with a readonly `props` getter that returns the frozen {@link MetaTagsProps}
 *
 * @example
 * ```typescript
 * // In +layout.ts
 * export const load = () => {
 *   const baseMeta = defineBaseMetaTags({
 *     title: 'My App',
 *     description: 'Welcome to my application'
 *   });
 *   return { meta: baseMeta.props };
 * };
 * ```
 */
export const defineBaseMetaTags = (obj: MetaTagsProps) =>
  new (class {
    readonly #baseMetaTags = Object.freeze(obj);

    get props() {
      return this.#baseMetaTags;
    }
  })();

/**
 * Creates a readonly, type-safe {@link MetaTagsProps} object specifically
 * designed for use in Svelte `+page` files.
 *
 * This function creates an immutable wrapper around meta tags configuration
 * for individual pages. The returned object provides a `props` getter to 
 * access the frozen meta tags configuration, which typically overrides or 
 * extends base meta tags defined in layout files.
 *
 * @param obj - The page-specific meta tags configuration object
 * @returns An instance with a readonly `props` getter that returns the frozen {@link MetaTagsProps}
 *
 * @example
 * ```typescript
 * // In +page.ts
 * export const load = () => {
 *   const pageMeta = definePageMetaTags({
 *     title: 'About Us',
 *     description: 'Learn more about our company'
 *   });
 *   return { meta: pageMeta.props };
 * };
 * ```
 */
export const definePageMetaTags = (obj: MetaTagsProps) =>
  new (class {
    readonly #pageMetaTags = Object.freeze(obj);

    get props() {
      return this.#pageMetaTags;
    }
  })();
