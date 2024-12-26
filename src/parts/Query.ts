import type { QueryKind } from "../utilities/QueryKind";
import type { WhereStatement } from "./Where";

export type Query<
  SelectStatement extends QueryKind<"SELECT">,
  Clauses extends QueryKind<"WHERE_CLAUSE">[] = [],
> = {
  _brand: "QUERY";
  SQL: `${SelectStatement["SQL"]}${WhereStatement<Clauses>["SQL"]}`;
  Result: SelectStatement["Result"];
  BindParameters: WhereStatement<Clauses>["BindParameters"];
};
