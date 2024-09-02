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
  isBlank?: (value: T) => boolean;
};

export function Table<T extends Record<string, V>, V>(props: {
  columns: ColumnSpec<V>[];
  defaultRow: T;
  items: T[];
  onChange?: (event: Event<T[]>) => void;
}) {
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

  function onChange(event: Event<V>, row: number, col: string): void {
    if (!props.onChange) {
      return;
    }
    const mapped = props.items
      .map((item, r) =>
        row == r ? { ...item, [col]: event.target.value } : item
      )
      .filter((row) => !isBlank(row));

    if (!mapped.some(isBlank)) {
      mapped.push(props.defaultRow);
    }
    props.onChange({ target: { value: mapped } });
  }

  return (
    <>
      <table>
        <thead>
          <tr key="header">
            {props.columns.map((col, m) => (
              <th key={`table-col-${m}`}>
                <label>{utils.capitalize(col.name)}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.items.map((row, n) => (
            <tr key={`table-row-${n}`}>
              {props.columns.map((col, m) => (
                <td key={`table-row-${n}-col-${m}`}>
                  <col.Type
                    onChange={(e) => onChange(e, n, col.name)}
                    value={row[col.name]}
                  ></col.Type>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
