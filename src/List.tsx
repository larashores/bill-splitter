import React from 'react'
import './App.css'


function List() {
    const [items, setItems] = React.useState([""])

    function onChange(event: {target: {value: string}}, ind: number) {
        const newItems = items.map((item, i) => i === ind ? event.target.value : item).filter(
            (item, i) => item || ind == i
        )
        
        if (newItems.every((item) => item)) {
            newItems.push("")
        }
        setItems(newItems)
        console.log(newItems)
    }

    return (
    <>
        <ul>
            {
                items.map(
                    (item, ind) => <li>
                        <input key={ind} onChange={(e) => onChange(e, ind)}></input>
                    </li>
                )
            }
        </ul>
    </>
    )
}

export default List
