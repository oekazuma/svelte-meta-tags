import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import type { MetaTagsProps } from './types';
import { deepMerge } from './deepMerge';

export type RootStateProps = ReadableBoxedValues<{
  props: Partial<MetaTagsProps>;
}>;

export class MetaTagsRootState {
  constructor(
    readonly base: MetaTagsRootState | null,
    readonly opts: RootStateProps
  ) {
    if (this.base === null) {
      ctx.set(this);
    }
  }

  get props() {
    const baseProps: Partial<MetaTagsProps> = this.base ? this.base.props : {};

    return deepMerge(baseProps, this.opts.props.current);
  }
}

export const ctx = new Context<MetaTagsRootState>('meta-tags-ctx');

export function useMetaTags(opts: RootStateProps) {
  let base: MetaTagsRootState | null;
  try {
    base = ctx.get();
  } catch {
    base = null;
  }

  return new MetaTagsRootState(base, opts);
}
