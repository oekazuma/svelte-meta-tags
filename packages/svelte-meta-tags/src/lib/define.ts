import type { MetaTagsProps } from './types';

/**
 * Creates a readonly, type-safe {@link MetaTagsProps} object specifically
 * designed for use in Svelte `+layout` files.
 *
 * This function provides a convenient way to define base meta tags that can
 * be inherited by child pages while ensuring type safety and immutability.
 *
 * @param obj - The meta tags configuration object
 * @returns An object with a `props` getter that returns the frozen meta tags
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
    readonly baseMetaTags = Object.freeze(obj);

    get props() {
      return this.baseMetaTags;
    }
  })();

/**
 * Creates a readonly, type-safe {@link MetaTagsProps} object specifically
 * designed for use in Svelte `+page` files.
 *
 * This function provides a convenient way to define page-specific meta tags
 * while ensuring type safety and immutability. Page meta tags typically
 * override or extend base meta tags defined in layout files.
 *
 * @param obj - The meta tags configuration object
 * @returns An object with a `props` getter that returns the frozen meta tags
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
    readonly pageMetaTags = Object.freeze(obj);

    get props() {
      return this.pageMetaTags;
    }
  })();
