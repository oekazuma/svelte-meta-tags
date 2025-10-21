import type { MetaTagsProps } from './types';

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+layout`.
 *
 * @param obj the input props
 * @returns an object containing the readonly input, either
 * spreadable for a direct use in an existing object, or
 * accessible through the `props` property for granular use
 *
 * @example
 * ```typescript
 * // In +layout.ts
 * export const load = () => {
 *   const baseMeta = defineBaseMetaTags({
 *     title: 'My App',
 *     description: 'Welcome to my application'
 *   });
 *   return { ...baseMeta };
 * };
 * ```
 */
export const defineBaseMetaTags = (obj: MetaTagsProps): { props: Readonly<MetaTagsProps> } =>
  new (class {
    private baseMetaTags = Object.freeze(obj);

    get props() {
      return this.baseMetaTags;
    }
  })();

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+page`.
 *
 * @param obj the input props
 * @returns an object containing the readonly input, either
 * spreadable for a direct use in an existing object, or
 * accessible through the `props` property for granular use
 *
 * @example
 * ```typescript
 * // In +page.ts
 * export const load = () => {
 *   const pageMeta = definePageMetaTags({
 *     title: 'About Us',
 *     description: 'Learn more about our company'
 *   });
 *   return { ...pageMeta };
 * };
 *
 * // In +layout.svelte
 * const metaTags = deepMerge(data.baseMeta, page.data.pageMeta);
 * ```
 */
export const definePageMetaTags = (obj: MetaTagsProps): { props: Readonly<MetaTagsProps> } =>
  new (class {
    private pageMetaTags = Object.freeze(obj);

    get props() {
      return this.pageMetaTags;
    }
  })();
