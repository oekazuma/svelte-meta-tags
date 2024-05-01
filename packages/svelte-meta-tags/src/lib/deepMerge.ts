import { assign } from 'radash';

type MergeParams = Parameters<typeof assign>;
export const deepMerge = (object1: MergeParams[1], object2: MergeParams[1]): ReturnType<typeof assign> => {
  return assign(object1, object2);
};
