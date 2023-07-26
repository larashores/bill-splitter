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
};

function List(props: {
  columns: Array<ColumnSpecifier>;
  onChange?: (event: Event<string[][]>) => void;
  initialValues?: string[][];
}) {
  const empty = Array<string>(props.columns.length).fill("");
  const initialValues =
    props.initialValues === undefined ? [empty] : props.initialValues;
  const [items, setItems] = React.useState(initialValues);

  function onChange(event: Event<string>, row: number, col: number) {
    const newItems = items
      .map((item, r) =>
        r === row
          ? item.map((v, c) => (c == col ? event.target.value : v))
          : item
      )
      .filter((item, i) => item.some((x) => x) || row == i);
    if (newItems.every((item) => item.some((x) => x))) {
      newItems.push(empty);
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
        {items.map((item, ind) => (
          <tr key={ind}>
            {props.columns.map((col, n) => (
              <td>
                <col.Type
                  onChange={(e) => onChange(e, ind, n)}
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
