import type { MetaTagsProps } from './types';

/**
 * A convenience wrapper for creating a readonly, type-safe
 * {@link MetaTagsProps} object for `+layout`.
 *
 * @param obj the input props
 * @returns an object containing the readonly input, either
 * spreadable for a direct use in an existing object, or
 * accessible through the `props` property for granular use
 */
export const defineBaseMetaTags = (obj: MetaTagsProps) =>
  new (class {
    readonly baseMetaTags = Object.freeze(obj);

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
 */
export const definePageMetaTags = (obj: MetaTagsProps) =>
  new (class {
    readonly pageMetaTags = Object.freeze(obj);

    get props() {
      return this.pageMetaTags;
    }
  })();
