import React from 'react'
import Toggle from "./Toggle.tsx"
import List from "./List.tsx"
import './App.css'


function App() {

  return (
    <>
        <h1>Tip Calculator</h1>
        <h2>Items</h2>
        <List/>
        <div id="layout">
            <label>Includes Tax:</label>
            <Toggle/>
            <label>Includes Tip:</label>
            <Toggle/>
        </div>
    </>
  )
}

export default App
