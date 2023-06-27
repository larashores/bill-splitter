import React from 'react'
import Toggle from "./Toggle.tsx"
import List from "./List.tsx"
import './App.css'


function App() {
    const [items, setItems] = React.useState([{amount: "", name: "", person: ""}])
    const [people, setPeople] = React.useState([""])
    const [tax, setTax] = React.useState(0)
    const [tip, setTip] = React.useState(0)

    function onItemChange(event: {target: {value: string}}, ind: number, field: string) {
        const newItems = items.map((item, i) => i === ind ? {...item, [field]: event.target.value} : item).filter(
            (item, i) => item.amount || item.name || ind == i
        )
        
        if (newItems.every((item) => item.amount || item.name)) {
            newItems.push({amount: "", name: "", person: ""})
        }
        setItems(newItems)
    }

    function onPersonChange(event: {target: {value: string}}, ind: number) {
        const newPeople = people.map((person, i) => i === ind ? event.target.value : person).filter(
            (item, i) => item || ind == i
        )
        
        if (newPeople.every((person) => person)) {
            newPeople.push("")
        }
        console.log(newPeople)
        setPeople(newPeople)

    }

    function getTaxPercent(): number {
        const total = items.filter(
            (row) => row.amount
        ).map(
            (row) => Number(row.amount)
        ).reduce(
            (amount, current) => Number(amount) + current, 0
        )
        return tax / total
    }
    function getTipPercent(): number {
        const total = items.filter(
            (row) => row.amount
        ).map(
            (row) => Number(row.amount)
        ).reduce(
            (amount, current) => Number(amount) + current, 0
        )
        return tip / total
    }

    function getTotal(person: string): number {
        const subtotal = items.filter(
            (row) => row.person == person && row.amount
        ).map(
            (row) => Number(row.amount)
        ).reduce(
            (amount, current) => Number(amount) + current, 0
        )
        const total = items.filter(
            (row) => row.amount
        ).map(
            (row) => Number(row.amount)
        ).reduce(
            (amount, current) => Number(amount) + current, 0
        )
        const tax_percent = tax / total
        const tip_percent = tip / total
        const result = subtotal * (1 + tax_percent + tip_percent)
        return Number.isNaN(result) ? 0 : result
    }


    return (
    <>
        <h1>Bill Splitter</h1>
        <h2>People</h2>
        <div id="people">
           <label>Name</label>
            {
                people.map(
                    (person, ind) => <>
                        <input onChange={(e) => onPersonChange(e, ind)} value={person}></input>
                    </>
                )
            }
        </div>
        <h2>Items</h2>
        <div id="items">
            <label>Name</label><label>Amount</label><label>Person</label>
            {
                items.map(
                    (item, ind) => <>
                        <input onChange={(e) => onItemChange(e, ind, "name")} value={item.name}/>
                        <input onChange={(e) => onItemChange(e, ind, "amount")} value={item.amount} type="number"/>
                        <select onChange={(e) => onItemChange(e, ind, "person")} value={item.person}>
                            <option value=""></option>
                            {
                                people.filter((person) => person).map(
                                    (person) => <option value={person}>{person}</option>
                                )
                            }
                        </select>
                    </>
                )
            }
        </div>
        <h2>Fees</h2>
        <div id="layout">
            <label>Tax:</label>
            <input type="number" value={tax} onChange={(e) => setTax(e.target.value)}></input>
            <select value="flat">
                <option value="Flat">Flat</option>
                <option value="Percent">Percent</option>
            </select>
            <label>Tip:</label>
            <input type="number" value={tip} onChange={(e) => setTip(e.target.value)}></input>
            <select value="flat">
                <option value="Flat">Flat</option>
                <option value="Percent">Percent</option>
            </select>
        </div>
        <h2>Results</h2>
        <ul>
            {
                people.filter((person) => person).map(
                    (person, ind) => <>
                        <li key={ind}>
                            {person}: {"$" + getTotal(person)?.toFixed(2)}
                            <ul>
                            {
                                items.filter((row) => row.person == person && row.amount).map(
                                    (row, ind) => <li key={ind}>
                                        {row.name} ${(row.amount * (1 + getTaxPercent() + getTipPercent())).toFixed(2)} = ${row.amount} + ${(Number(row.amount) * getTaxPercent()).toFixed(2)} Tax + ${(Number(row.amount) * getTipPercent()).toFixed(2)} Tip
                                    </li>
                                )
                            }
                            </ul>
                        </li>
                    </>
                )
            }
        </ul>
        
    </>
    )
}

export default App
