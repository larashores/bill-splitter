// import React from 'react'
// import './App.css'

// type ColumnSpecifier = {name: string, type?: string}

// function List(props: {columns: Array<ColumnSpecifier>}) {
//     const empty = props.columns.reduce((acc, item) => ({ ...acc, [item.name]: "" }), {})
//     const [items, setItems] = React.useState([empty])

//     function onChange(event: {target: {value: string}}, ind: number, field: string) {
//         const newItems = items.map(
//             (item, i) => i === ind ? {...item, [field]: event.target.value} : item
//         ).filter(
//             (item, i) => Object.values(item).some(x => x) || ind == i
//         )
//         if (newItems.every((item) => Object.values(item).some(x => x))) {
//             newItems.push(empty)
//         }
//         setItems(newItems)
//         console.log(newItems)
//     }

//     return (
//     <>
//         <ul>
//             <li key="header">
//                 {
//                     props.columns.map(
//                         (item) => <label>{item.name}</label>
//                     )
//                 }
//             </li>
//             {
//                 items.map(
//                     (item, ind) => <li key={ind}>
//                         {
//                             props.columns.map(
//                                 (col) => col.type == "select" ?
//                                 <select onChange={(e) =>  onChange(e, ind, col.name)} value={item[col.name]}>
//                                     <option value="Lara">Lara</option>
//                                     <option value="Kat">Kat</option>
//                                 </select>:
//                                 <input onChange={(e) => onChange(e, ind, col.name)} value={item[col.name]} type={col.type}/>
//                             )
//                         }
//                     </li>
//                 )
//             }
//         </ul>
//     </>
//     )
// }

// export default List
