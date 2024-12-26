/**
 * Converts an array of keys to a union of the keys.
 **/
export type KeyArrayToUnion<O, A extends (keyof O)[]> = A extends [infer H]
  ? H
    : A extends [infer H, ...infer T extends (keyof O)[]]
      ? H | KeyArrayToUnion<O, T>
      : never;

/**
 * Joins an array of strings together with a separator.
 **/
export type PropertyJoin<K extends (string | number | symbol)[], Separator extends string, Contents extends string = ""> = 
    K extends [infer H extends string] 
        ? `${Contents}${H}`
        : K extends [infer H extends string, ...infer T extends string[]] 
            ? `${H}${Contents}${Separator}${PropertyJoin<T, Separator, Contents>}`
            : ""
