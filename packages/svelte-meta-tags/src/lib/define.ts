import type { MetaTagsProps } from './types';

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+layout`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props inside a ready-to-use object
 *
 * @example
 * ```typescript
 * // In +layout.ts
 * export const load = () => {
 *   const baseTags = defineBaseMetaTags({
 *     title: 'My App',
 *     description: 'Welcome to my application'
 *   });
 *   return { ...baseTags };
 * };
 * ```
 */
export const defineBaseMetaTags = (obj: MetaTagsProps) => ({ baseMetaTags: Object.freeze(obj) });

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+page`.
 *
 * @param obj the input props
 * @returns a frozen copy of the input props inside a ready-to-use object
 *
 * @example
 * ```typescript
 * // In +page.ts
 * export const load = () => {
 *   const pageTags = definePageMetaTags({
 *     title: 'About Us',
 *     description: 'Learn more about our company'
 *   });
 *   return { ...pageTags };
 * };
 *
 * // In +layout.svelte
 * const metaTags = deepMerge(data.baseMetaTags, page.data.pageMetaTags);
 * ```
 */
export const definePageMetaTags = (obj: MetaTagsProps) => ({ pageMetaTags: Object.freeze(obj) });
