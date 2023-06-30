// import React from 'react'
// import "./Toggle.css"


// function Toggle(props: {id?: string}) {
    
//     const id = props.id || "toggle-" + Toggle.nextID++

//     const [checked, setChecked] = React.useState(true)

//     return <>
//         <div className="toggle">
//             <input type="checkbox" className="toggle-checkbox" name="toggleSwitch" id={id} checked={checked} onChange={e => setChecked(e.target.checked)}/>
//             <label className="toggle-label" htmlFor={id}>
//                 <span className="toggle-inner"/>
//                 <span className="toggle-switch"/>
//             </label>
//         </div>
//     </>
// }
// Toggle.nextID = 0

// export default Toggle