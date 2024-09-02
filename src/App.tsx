import React from "react";
import { Table } from "./Table.tsx";
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
    { name: "", amount: "", person: "" },
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

  function getTotal(person: string): number {
    const totalPeople = people.filter((person) => person.name).length;
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
          .filter((person) => person.name)
          .map((person) => (
            <option value={person.name}>{person.name}</option>
          ))}
        <option value="all">All</option>
      </select>
    );
  }

  function LineItem(
    row: { name: string; amount: string; person: string },
    ind: number
  ) {
    const totalPeople = people.filter((person) => person.name).length;
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
          .filter((person) => person.name)
          .map((person, ind) => (
            <li key={ind}>
              {person.name}: {"$" + getTotal(person.name)?.toFixed(2)}
              <ul>
                {items
                  .filter(
                    (row) =>
                      [person.name, "all"].includes(row.person) && row.amount
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
      <Table
        columns={[{ name: "name", Type: TextCell }]}
        items={people}
        onChange={(e) => setPeople(e.target.value)}
      />
      <h2>Items</h2>
      <Table
        columns={[
          { name: "name", Type: TextCell },
          { name: "amount", Type: NumberCell },
          { name: "person", Type: PersonCell },
        ]}
        items={items}
        onChange={(e) => setItems(e.target.value)}
      />

      <h2>Fees</h2>
      <Table
        columns={[
          { name: "name", Type: TextCell },
          { name: "amount", Type: NumberCell },
          { name: "type", Type: FeeCell, isBlank: (_) => true },
        ]}
        items={fees}
        onChange={(e) => setFees(e.target.value)}
      />
      <h2>Results</h2>
      <Results />
    </>
  );
}

export default App;
