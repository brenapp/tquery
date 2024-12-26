import type { PropertyJoin } from "../utilities/KeyArray";
import { QueryKind } from "../utilities/QueryKind";
import type { GenericTableKind, TableObject } from "./Table";

export type BindType<Field> = Field extends string
  ? string
  : Field extends number
    ? number
    : never;

export type WhereEquals<
  Table extends GenericTableKind,
  Field extends keyof Table["Shape"],
> = Field extends string
  ? {
      _brand: "WHERE_CLAUSE";
      SQL: `${Table["Name"]}.${Field} = ?`;
      Result: TableObject;
      BindParameters: [BindType<Table["Shape"][Field]>];
    }
  : never;

export type WhereIsNull<
  Table extends GenericTableKind,
  Field extends keyof Table["Shape"],
> = Field extends string
  ? {
      _brand: "WHERE_CLAUSE";
      SQL: `${Table["Name"]}.${Field} ISNULL`;
      Result: TableObject;
      BindParameters: [];
    }
  : never;

export type WhereIsNotNull<
  Table extends GenericTableKind,
  Field extends keyof Table["Shape"],
> = Field extends string
  ? {
      _brand: "WHERE_CLAUSE";
      SQL: `${Table["Name"]}.${Field} NOT NULL`;
      Result: TableObject;
      BindParameters: [];
    }
  : never;

export type WhereClausesSQL<Clauses extends QueryKind<"WHERE_CLAUSE">[]> =
  Clauses extends [infer H extends QueryKind<"WHERE_CLAUSE">]
    ? [H["SQL"]]
    : Clauses extends [
          infer H extends QueryKind<"WHERE_CLAUSE">,
          ...infer T extends QueryKind<"WHERE_CLAUSE">[],
        ]
      ? [H["SQL"], ...WhereClausesSQL<T>]
      : never;

export type WhereClausesBindParameters<
  Clauses extends QueryKind<"WHERE_CLAUSE">[],
> = Clauses extends [infer H extends QueryKind<"WHERE_CLAUSE">]
  ? [...H["BindParameters"]]
  : Clauses extends [
        infer H extends QueryKind<"WHERE_CLAUSE">,
        ...infer T extends QueryKind<"WHERE_CLAUSE">[],
      ]
    ? [...H["BindParameters"], ...WhereClausesBindParameters<T>]
    : [];

export type WhereStatement<Clauses extends QueryKind<"WHERE_CLAUSE">[]> = {
  _brand: "WHERE_STATEMENT";
  SQL: Clauses extends []
    ? ""
    : ` WHERE ${PropertyJoin<WhereClausesSQL<Clauses>, " AND ">}`;
  Result: TableObject;
  BindParameters: WhereClausesBindParameters<Clauses>;
};
