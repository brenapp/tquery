/**
 * Represents the output of a table when a query is constructed from your SQL
 * driver.
 **/
export type TableObject = Record<string, string | number | null>;

/**
 * Represents the table type being passed around.
 **/
export type TableKind<Name extends string, Shape extends TableObject> = {
  Name: Name;
  Shape: Shape;
};

/**
 * Represents the table type being passed around.
 **/
export type GenericTableKind = TableKind<string, TableObject>;
