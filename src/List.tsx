import React from "react";
import "./App.css";

type Event = { target: { value: string } };

type ColumnSpecifier = {
    name: string,
    Type: (
        onChange: (event: Event) => void,
        value: string,
    ) => any
};

function List(props: { columns: Array<ColumnSpecifier> }) {
  const empty = props.columns.reduce(
    (acc, item) => ({ ...acc, [item.name]: "" }),
    {}
  );
  const [items, setItems] = React.useState([empty]);

  function onChange2(event: Event, ind: number, field: string) {
    const newItems = items
      .map((item, i) =>
        i === ind ? { ...item, [field]: event.target.value } : item
      )
      .filter((item, i) => Object.values(item).some((x) => x) || ind == i);
    if (newItems.every((item) => Object.values(item).some((x) => x))) {
      newItems.push(empty);
    }
    setItems(newItems);
    console.log(newItems);
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
            {props.columns.map((col) => (
              <td>
                <col.Type onChange={(e) => onChange2(e, ind, col.name)} value={item[col.name]}></col.Type>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default List;
