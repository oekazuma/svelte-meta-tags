import type { MetaTagsProps } from './types';

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+layout`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props
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
export const defineBaseMetaTags = (obj: MetaTagsProps): Readonly<MetaTagsProps> => Object.freeze(obj);

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+page`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props
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
export const definePageMetaTags = (obj: MetaTagsProps): Readonly<MetaTagsProps> => Object.freeze(obj);
