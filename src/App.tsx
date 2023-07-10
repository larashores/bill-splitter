import React from "react";
// import Toggle from "./Toggle.tsx"
// import List from "./List.tsx"
import "./App.css";

function App() {
  const [people, setPeople] = React.useState([""]);
  const [items, setItems] = React.useState([
    { amount: "", name: "", person: "" },
  ]);
  const [fees, setFees] = React.useState([
    { amount: "", name: "Tax", type: "flat" },
    { amount: "", name: "Tip", type: "flat" },
    { amount: "", name: "", type: "flat" },
  ]);

  function prefix(pre: string, value: string): string {
    return value ? pre + value : value;
  }

  function onPersonChange(event: { target: { value: string } }, ind: number) {
    const newPeople = people
      .map((person, i) => (i === ind ? event.target.value : person))
      .filter((item, i) => item || ind == i);

    if (newPeople.every((person) => person)) {
      newPeople.push("");
    }
    console.log(newPeople);
    setPeople(newPeople);
  }

  function onItemChange(
    event: { target: { value: string } },
    ind: number,
    field: string
  ) {
    const newItems = items
      .map((item, i) =>
        i === ind ? { ...item, [field]: event.target.value } : item
      )
      .filter((item, i) => item.amount || item.name || ind == i);

    if (newItems.every((item) => item.amount || item.name)) {
      newItems.push({ amount: "", name: "", person: "" });
    }
    setItems(newItems);
  }

  function onFeeChange(
    event: { target: { value: string } },
    ind: number,
    field: string
  ) {
    const newFees = fees
      .map((item, i) =>
        i === ind ? { ...item, [field]: event.target.value } : item
      )
      .filter((item, i) => item.amount || item.name || ind == i);

    if (newFees.every((row) => row.amount || row.name)) {
      newFees.push({ amount: "", name: "", type: "flat" });
    }
    setFees(newFees);
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
    const subtotal = items
      .filter((row) => row.person == person && row.amount)
      .map((row) => Number(row.amount))
      .reduce((amount, current) => Number(amount) + current, 0);
    const total = breakdownFees(subtotal)
      .map((row) => row.amount)
      .reduce((amount, current) => amount + current, subtotal);
    return Number.isNaN(total) ? 0 : total;
  }

  return (
    <>
      <h1>Bill Splitter</h1>
      <h2>People</h2>
      <table>
        <tr>
          <th>
            <label>Name</label>
          </th>
        </tr>
        {people.map((person, ind) => (
          <>
            <tr>
              <td>
                <input
                  onChange={(e) => onPersonChange(e, ind)}
                  value={person}
                ></input>
              </td>
            </tr>
          </>
        ))}
      </table>
      <h2>Items</h2>
      <table>
        <tr>
          <th>
            <label>Name</label>
          </th>
          <th>
            <label>Amount</label>
          </th>
          <th>
            <label>Person</label>
          </th>
        </tr>
        {items.map((item, ind) => (
          <>
            <tr>
              <td>
                <input
                  onChange={(e) => onItemChange(e, ind, "name")}
                  value={item.name}
                />
              </td>
              <td>
                <input
                  onChange={(e) => onItemChange(e, ind, "amount")}
                  value={item.amount}
                  type="number"
                />
              </td>
              <td>
                <select
                  onChange={(e) => onItemChange(e, ind, "person")}
                  value={item.person}
                >
                  <option value=""></option>
                  {people
                    .filter((person) => person)
                    .map((person) => (
                      <option value={person}>{person}</option>
                    ))}
                </select>
              </td>
            </tr>
          </>
        ))}
      </table>
      <h2>Fees</h2>
      <table>
        <tr>
          <th>
            <label>Name</label>
          </th>
          <th>
            <label>Amount</label>
          </th>
          <th>
            <label>Type</label>
          </th>
        </tr>
        {fees.map((row, ind) => (
          <>
            <tr>
              <td>
                <input
                  onChange={(e) => onFeeChange(e, ind, "name")}
                  value={row.name}
                />
              </td>
              <td>
                <input
                  onChange={(e) => onFeeChange(e, ind, "amount")}
                  value={row.amount}
                  type="number"
                />
              </td>
              <td>
                <select
                  value={row.type}
                  onChange={(e) => onFeeChange(e, ind, "type")}
                >
                  <option value="Flat">Flat</option>
                  <option value="Percent">Percent</option>
                </select>
              </td>
            </tr>
          </>
        ))}
      </table>
      <h2>Results</h2>
      <ul id="results">
        {people
          .filter((person) => person)
          .map((person, ind) => (
            <>
              <li key={ind}>
                {person}: {"$" + getTotal(person)?.toFixed(2)}
                <ul>
                  {items
                    .filter((row) => row.person == person && row.amount)
                    .map((row, ind) => (
                      <li key={ind}>
                        {row.name} : $
                        {breakdownFees(Number(row.amount))
                          .map((row) => row.amount)
                          .reduce(
                            (amount, current) => amount + current,
                            Number(row.amount)
                          )
                          .toFixed(2)}
                        {prefix(
                          ` = $${row.amount} + `,
                          breakdownFees(Number(row.amount))
                            .map(
                              (row) => `$${row.amount.toFixed(2)} ${row.name}`
                            )
                            .join(" + ")
                        )}
                      </li>
                    ))}
                </ul>
              </li>
            </>
          ))}
      </ul>
    </>
  );
}

export default App;
