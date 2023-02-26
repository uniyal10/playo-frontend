import { useState, useEffect } from "react"
import Axios from "axios"
import Event from "./Event"
function Home(props) {
  const [isLoading, setIsLoading] = useState(true)
  let [events, setEvents] = useState()
  const [searchInput, setSearchInput] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("http://localhost:8080/events")
        if (response) {
          console.log(response)
          setEvents(response.data)
          setSearchInput(response.data)
          setIsLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    // setSearchInput(events)
    if (events)
      events = events.filter(function (event) {
        console.log(event.eventname)
        console.log(props.searchInput)
        if (event.eventname.toLowerCase().includes(props.searchInput.toLowerCase())) {
          return event
        }
      })
    console.log(events)
    setSearchInput(events)
  }, [props.searchInput])
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div class="container py-md-10">
        <h2 class="text-center">
          Hello <strong>{localStorage.getItem("sportoAppusername")}</strong>, Join Following events.
        </h2>
        <div className="d-flex flex-wrap">
          {searchInput.map(data => {
            return <Event event={data} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home
