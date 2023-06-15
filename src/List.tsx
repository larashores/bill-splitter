import React from 'react'
import './App.css'


function List() {
    const [items, setItems] = React.useState([{amount: "", name: ""}])

    function onChange(event: {target: {value: string}}, ind: number, field: string) {
        const newItems = items.map((item, i) => i === ind ? {...item, [field]: event.target.value} : item).filter(
            (item, i) => item.amount || item.name || ind == i
        )
        
        if (newItems.every((item) => item.amount || item.name)) {
            newItems.push({amount: "", name: ""})
        }
        setItems(newItems)
        console.log(newItems)
    }

    return (
    <>
        <ul>
            <li key="header">
                <label>Name</label>
                <label>Amount</label>
            </li>
            {
                items.map(
                    (item, ind) => <li key={ind}>
                        <input onChange={(e) => onChange(e, ind, "name")} value={item.name}></input>
                        <input onChange={(e) => onChange(e, ind, "amount")} value={item.amount} type="number"></input>
                    </li>
                )
            }
        </ul>
    </>
    )
}

export default List
