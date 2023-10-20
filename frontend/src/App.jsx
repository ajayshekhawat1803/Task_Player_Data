import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AddData from './Components/AddData'
import GetData from './Components/GetData'
import PlayerData from './Components/PlayerData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <header>
      <Link to="/addData">Add Data</Link>
      <Link to="/getData">Get Data</Link>
    </header>
      <Routes>
        <Route path="/addData" element={<AddData />} />
        <Route path="/getData" element={<GetData />} />
        <Route path="/PlayerData/:search" element={<PlayerData/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
