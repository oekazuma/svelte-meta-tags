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
    private baseMetaProps = Object.freeze(obj);

    get props() {
      return this.baseMetaProps;
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
    private pageMetaProps = Object.freeze(obj);

    get props() {
      return this.pageMetaProps;
    }
  })();
