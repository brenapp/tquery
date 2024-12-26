import type { TableObject } from "../parts/Table";

export type QueryKind<B extends string> = {
  _brand: B;
  SQL: string;
  Result: TableObject;
  BindParameters: (string | number)[];
};
