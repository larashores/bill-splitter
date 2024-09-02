import React from "react";
import "./App.css";
import * as utils from "./utils.tsx";

export type Event<T> = { target: { value: T } };
export type CellProps<T> = {
  onChange: (event: Event<T>) => void;
  value: T;
};

export type ColumnSpec<T> = {
  name: string;
  Type: React.FC<CellProps<T>>;
  default?: T;
  isBlank?: (value: T) => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnSpec<any>[];
  items: T[];
  onChange?: (event: Event<T[]>) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultRow = {} as any;
  for (const col of props.columns) {
    defaultRow[col.name] = col.default;
  }

  function isBlank(row: T) {
    for (const [name, value] of Object.entries(row)) {
      const columnSpec = props.columns.find((c) => c.name == name);
      if (columnSpec && columnSpec.isBlank) {
        if (!columnSpec.isBlank(value)) {
          return false;
        }
      } else if (value) {
        return false;
      }
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onChange(event: Event<any>, row: number, col: string): void {
    if (!props.onChange) {
      return;
    }
    const mapped = props.items
      .map((item, r) =>
        row == r ? { ...item, [col]: event.target.value } : item
      )
      .filter((row) => !isBlank(row));

    if (!mapped.some(isBlank)) {
      mapped.push(defaultRow);
    }
    props.onChange({ target: { value: mapped } });
  }

  return (
    <>
      <table>
        <tr key="header">
          {props.columns.map((col) => (
            <th>
              <label>{utils.capitalize(col.name)}</label>
            </th>
          ))}
        </tr>
        {props.items.map((row, n) => (
          <tr>
            {props.columns.map((col) => (
              <td>
                <col.Type
                  onChange={(e) => onChange(e, n, col.name)}
                  value={row[col.name]}
                ></col.Type>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}
