import React from "react";
import List from "./List.tsx";
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
  const [people, setPeople] = React.useState([""]);
  const [items, setItems] = React.useState([
    { amount: "", name: "", person: "" },
  ]);
  const [fees, setFees] = React.useState([{ amount: "", name: "", type: "" }]);

  function onPersonChange(event: { target: { value: string[][] } }) {
    setPeople(event.target.value.map((row) => row[0]));
  }

  function onItemChange(event: { target: { value: string[][] } }) {
    setItems(
      event.target.value.map((row) => ({
        name: row[0],
        amount: row[1],
        person: row[2],
      }))
    );
  }

  function onFeeChange(event: { target: { value: string[][] } }) {
    setFees(
      event.target.value.map((row) => ({
        name: row[0],
        amount: row[1],
        type: row[2],
      }))
    );
  }

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

  function getTotal(person: string): number {
    const totalPeople = people.filter((person) => person).length;
    const subtotal = items
      .filter((row) => [person, "all"].includes(row.person) && row.amount)
      .map((row) =>
        row.person == "all"
          ? Number(row.amount) / totalPeople
          : Number(row.amount)
      )
      .reduce((amount, current) => Number(amount) + current, 0);
    const total = breakdownFees(subtotal)
      .map((row) => row.amount)
      .reduce((amount, current) => amount + current, subtotal);
    return Number.isNaN(total) ? 0 : total;
  }

  function PersonCell(props: React.ComponentProps<"select">) {
    return (
      <select {...props}>
        <option value=""></option>
        {people
          .filter((person) => person)
          .map((person) => (
            <option value={person}>{person}</option>
          ))}
        <option value="all">All</option>
      </select>
    );
  }

  function LineItem(
    row: { name: string; amount: string; person: string },
    ind: number
  ) {
    const totalPeople = people.filter((person) => person).length;
    const attributableAmount =
      row.person == "all"
        ? Number(row.amount) / totalPeople
        : Number(row.amount);
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
          .filter((person) => person)
          .map((person, ind) => (
            <li key={ind}>
              {person}: {"$" + getTotal(person)?.toFixed(2)}
              <ul>
                {items
                  .filter(
                    (row) => [person, "all"].includes(row.person) && row.amount
                  )
                  .map((row, ind) => LineItem(row, ind))}
              </ul>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Bill Splitter</h1>
      <h2>People</h2>
      <List
        columns={[{ name: "Name", Type: TextCell }]}
        onChange={onPersonChange}
      />
      <h2>Items</h2>
      <List
        columns={[
          { name: "Name", Type: TextCell },
          { name: "Amount", Type: NumberCell },
          { name: "Person", Type: PersonCell },
        ]}
        onChange={onItemChange}
      />
      <h2>Fees</h2>
      <List
        columns={[
          { name: "Name", Type: TextCell },
          { name: "Amount", Type: NumberCell },
          { name: "Type", Type: FeeCell, isBlank: (_) => true },
        ]}
        onChange={onFeeChange}
        initialValues={[
          ["Tax", "", "flat"],
          ["Tip", "", "flat"],
          ["", "", "flat"],
        ]}
        defaultRow={["", "", "flat"]}
      />
      <h2>Results</h2>
      <Results />
    </>
  );
}

export default App;
