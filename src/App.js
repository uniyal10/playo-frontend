import HomeGuest from "./components/HomeGuest"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import { useState } from "react"
import CreateEvent from "./components/CreateEvent"
import SingleEvent from "./components/SingleEvent"

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("sportoApptoken")))
  const [searchInput, setSearchInput] = useState()
  function handleSearch(e) {
    setSearchInput(e)
  }
  return (
    <>
      <BrowserRouter>
        <Header handleSearch={handleSearch} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home searchInput={searchInput} /> : <HomeGuest setLoggedIn={setLoggedIn} />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={loggedIn ? <SingleEvent /> : <HomeGuest setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
