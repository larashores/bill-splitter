import React from "react";
import { ColumnSpec, Table, Event } from "./Table.tsx";
import * as utils from "./utils.tsx";
import "./App.css";

function NumberCell(props: React.ComponentProps<"input">) {
  return <input type="number" {...props}></input>;
}

function TextCell(props: React.ComponentProps<"input">) {
  return <input {...props}></input>;
}

function FeeCell(props: React.ComponentProps<"select">) {
  return (
    <select {...props}>
      <option value="flat">Flat</option>
      <option value="percent">Percent</option>
    </select>
  );
}

function App() {
  const [people, setPeople] = React.useState([{ name: "" }]);
  const [items, setItems] = React.useState([
    { name: "", amount: "", people: [] as string[] },
  ]);

  const [fees, setFees] = React.useState([
    { name: "Tax", amount: "", type: "flat" },
    { name: "Tip", amount: "", type: "flat" },
    { name: "", amount: "", type: "flat" },
  ]);

  function breakdownFees(value: number) {
    const total = items
      .filter((row) => row.amount)
      .map((row) => Number(row.amount))
      .reduce((amount, current) => Number(amount) + current, 0);
    const amounts = fees
      .filter((row) => row.amount && row.name)
      .map((row) => ({
        amount:
          (row.type == "flat"
            ? Number(row.amount) / total
            : Number(row.amount) / 100) * value,
        name: row.name,
      }));
    return amounts;
  }

  function getTotal(person: string | undefined): number {
    const subtotal = items
      .filter(
        (item) =>
          (person === undefined || item.people.includes(person)) && item.amount
      )
      .map(
        (item) =>
          Number(item.amount) / (person === undefined ? 1 : item.people.length)
      )
      .reduce((amount, current) => Number(amount) + current, 0);
    const total = breakdownFees(subtotal)
      .map((row) => row.amount)
      .reduce((amount, current) => amount + current, subtotal);
    return Number.isNaN(total) ? 0 : total;
  }

  function PeopleCell(props: {
    value: string[];
    onChange: (val: Event<string[]>) => void;
  }) {
    const [selected, setSelected] = React.useState(props.value);
    const [clicked, setClicked] = React.useState(false);
    const existing = props.value.filter((name) =>
      people.map((person) => person.name).includes(name)
    );
    if (props.value.length != existing.length) {
      props.onChange({ target: { value: existing } });
    }
    let cell = (
      <button
        onClick={() =>
          setClicked(people.filter((person) => person.name).length != 0)
        }
      >
        {props.value.join(", ")}
      </button>
    );
    if (clicked) {
      cell = (
        <>
          <div id="people-select">
            {people
              .filter((person) => person.name)
              .map((person, n) => (
                <div id="people-select-row" key={`people-select-row-${n}`}>
                  <input
                    type="checkbox"
                    id={`select-${person.name}`}
                    checked={selected.includes(person.name)}
                    onChange={(e) => {
                      const checked = new Set<string>(selected);
                      if (e.target.checked) {
                        checked.add(person.name);
                      } else {
                        checked.delete(person.name);
                      }
                      setSelected([...checked]);
                    }}
                  ></input>
                  <label htmlFor={`select-${person.name}`}>{person.name}</label>
                </div>
              ))}
            <button
              id="people-select-button"
              onClick={() => {
                setClicked(false);
                props.onChange({ target: { value: selected } });
              }}
            >
              Select
            </button>
          </div>
          {cell}
        </>
      );
    }
    return cell;
  }

  function LineItem(
    row: { name: string; amount: string; people: string[] },
    ind: number
  ) {
    const attributableAmount = Number(row.amount) / row.people.length;
    return (
      <li key={ind}>
        {row.name} : $
        {breakdownFees(attributableAmount)
          .map((row) => row.amount)
          .reduce((amount, current) => amount + current, attributableAmount)
          .toFixed(2)}
        {utils.prefix(
          ` = $${attributableAmount.toFixed(2)} + `,
          breakdownFees(attributableAmount)
            .map((row) => `$${row.amount.toFixed(2)} ${row.name}`)
            .join(" + ")
        )}
      </li>
    );
  }

  function Results() {
    return (
      <ul id="results">
        {people
          .filter((person) => person.name)
          .map((person, ind) => (
            <li key={ind}>
              {person.name}: {"$" + getTotal(person.name)?.toFixed(2)}
              <ul>
                {items
                  .filter(
                    (row) => row.people.includes(person.name) && row.amount
                  )
                  .map((row, ind) => LineItem(row, ind))}
              </ul>
            </li>
          ))}
        {people.filter((person) => person.name).length ? (
          <li>Total: ${getTotal(undefined)?.toFixed(2)}</li>
        ) : null}
      </ul>
    );
  }

  return (
    <>
      <h1>Bill Splitter</h1>
      <h2>People</h2>
      <Table
        columns={[{ name: "name", Type: TextCell }]}
        items={people}
        onChange={(e) => setPeople(e.target.value)}
        defaultRow={{ name: "" }}
      />
      <h2>Items</h2>
      <Table
        columns={[
          { name: "name", Type: TextCell },
          { name: "amount", Type: NumberCell },
          {
            name: "people",
            Type: PeopleCell,
            isBlank: (v) => !v.length,
          } as ColumnSpec<string | string[]>,
        ]}
        defaultRow={{ name: "", amount: "", people: [] }}
        items={items}
        onChange={(e) => setItems(e.target.value)}
      />

      <h2>Fees</h2>
      <Table
        columns={[
          { name: "name", Type: TextCell },
          { name: "amount", Type: NumberCell },
          { name: "type", Type: FeeCell, isBlank: (x) => x == x },
        ]}
        defaultRow={{ name: "", amount: "", type: "flat" }}
        items={fees}
        onChange={(e) => setFees(e.target.value)}
      />
      <h2>Results</h2>
      <Results />
    </>
  );
}

export default App;
