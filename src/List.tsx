import React from "react";
import "./App.css";

type Event<T> = { target: { value: T } };
type Props = {
  onChange: (event: Event<string>) => void;
  value: string;
};

type ColumnSpecifier = {
  name: string;
  Type: React.FC<Props>;
  isBlank?: (value: string) => boolean;
};

function List(props: {
  columns: Array<ColumnSpecifier>;
  onChange?: (event: Event<string[][]>) => void;
  initialValues?: string[][];
  defaultRow?: string[];
}) {
  const defaultRow = props.defaultRow
    ? props.defaultRow
    : Array<string>(props.columns.length).fill("");
  const initialValues = props.initialValues
    ? props.initialValues
    : [defaultRow];
  const [items, setItems] = React.useState(initialValues);

  function isBlank(value: string, col: number) {
    const f = props.columns[col].isBlank;
    return f ? f(value) : value === "";
  }

  function onChange(event: Event<string>, row: number, col: number) {
    const newItems = items
      .map((item, m) =>
        m === row
          ? item.map((v, n) => (n == col ? event.target.value : v))
          : item
      )
      .filter((item, m) => item.some((x, n) => !isBlank(x, n)) || row == m);

    if (newItems.every((item) => item.some((x, n) => !isBlank(x, n)))) {
      newItems.push(defaultRow);
    }
    setItems(newItems);
    if (props.onChange !== undefined) {
      props.onChange({
        ...event,
        target: { ...event.target, value: newItems },
      });
    }
  }

  return (
    <>
      <table>
        <tr key="header">
          {props.columns.map((item) => (
            <th>
              <label>{item.name}</label>
            </th>
          ))}
        </tr>
        {items.map((item, m) => (
          <tr key={m}>
            {props.columns.map((col, n) => (
              <td>
                <col.Type
                  onChange={(e) => onChange(e, m, n)}
                  value={item[n]}
                ></col.Type>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default List;
