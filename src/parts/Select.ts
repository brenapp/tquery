import type { KeyArrayToUnion, PropertyJoin } from "../utilities/KeyArray";
import { QueryKind } from "../utilities/QueryKind";
import type { GenericTableKind, TableObject } from "./Table";

export type Select<
  Table extends GenericTableKind,
  Fields extends (keyof Table["Shape"])[],
> = {
  _brand: "SELECT";
  SQL: `SELECT ${Table["Name"]}.${PropertyJoin<
    Fields,
    `, ${Table["Name"]}.`
  >} FROM ${Table["Name"]}`;
  Result: Pick<Table["Shape"], KeyArrayToUnion<Table["Shape"], Fields>>;
  BindParameters: [];
};

export type SelectJoin<
  Table extends GenericTableKind,
  Fields extends (keyof Table["Shape"])[],
  JoinTable extends GenericTableKind,
  JoinFields extends (keyof JoinTable["Shape"])[],
  J extends QueryKind<"JOIN_CLAUSE">,
> = {
  _brand: "SELECT";
  SQL: `SELECT ${Table["Name"]}.${PropertyJoin<
    Fields,
    `, ${Table["Name"]}.`
  >}, ${JoinTable["Name"]}.${PropertyJoin<
    JoinFields,
    `, ${JoinTable["Name"]}.`
  >} FROM ${Table["Name"]} ${J["SQL"]}`;
  Result:
    & Pick<Table["Shape"], KeyArrayToUnion<Table["Shape"], Fields>>
    & Pick<JoinTable["Shape"], KeyArrayToUnion<JoinTable["Shape"], JoinFields>>;
  BindParameters: [];
};

export type JoinClause<
  A extends GenericTableKind,
  B extends GenericTableKind,
  Field extends keyof A["Shape"],
  JoinField extends keyof B["Shape"],
> = Field extends string ? JoinField extends string ? {
      _brand: "JOIN_CLAUSE";
      SQL: `JOIN ${B["Name"]} ON ${A["Name"]}.${Field} = ${B[
        "Name"
      ]}.${JoinField}`;
      Result: TableObject;
      BindParameters: [];
    }
  : never
  : never;
