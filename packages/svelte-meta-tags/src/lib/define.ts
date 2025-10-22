import type { MetaTagsProps, BaseMetaTags, PageMetaTags } from './types';

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+layout`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props with a marker for type identification
 *
 * @example
 * ```typescript
 * // In +layout.ts
 * export const load = () => {
 *   const baseMetaTags = defineBaseMetaTags({
 *     title: 'My App',
 *     description: 'Welcome to my application'
 *   });
 *   return { baseMetaTags };
 * };
 * ```
 */
export const defineBaseMetaTags = (obj: MetaTagsProps): BaseMetaTags =>
  Object.freeze(Object.assign({}, obj, { _isBaseMetaTags: true as const })) as BaseMetaTags;

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+page`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props with a marker for type identification
 *
 * @example
 * ```typescript
 * // In +page.ts
 * export const load = () => {
 *   const pageMetaTags = definePageMetaTags({
 *     title: 'About Us',
 *     description: 'Learn more about our company'
 *   });
 *   return { pageMetaTags };
 * };
 *
 * // In +layout.svelte
 * const metaTags = deepMerge(data.baseMetaTags, page.data.pageMetaTags);
 * ```
 */
export const definePageMetaTags = (obj: MetaTagsProps): PageMetaTags =>
  Object.freeze(Object.assign({}, obj, { _isPageMetaTags: true as const })) as PageMetaTags;
