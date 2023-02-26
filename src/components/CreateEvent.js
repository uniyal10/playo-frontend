import Axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateEvent() {
  const [eventname, setEventname] = useState()
  const [description, setDescription] = useState()
  const [size, setSize] = useState()
  const [date, setDate] = useState()
  const [vanue, setVanue] = useState()
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    Axios.post("http://localhost:8080/createEvent", { eventname, description, size, date, vanue, token: localStorage.getItem("sportoApptoken") })
      .then(function (response) {
        console.log(response)
        navigate(`/event/${response.data}`)
      })
      .catch(function () {
        console.log("something wrong")
      })
  }
  return (
    <>
      <div className="container container--narrow py-md-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="post-title" className="text-muted mb-1">
              <small>Event Name</small>
            </label>
            <input onChange={e => setEventname(e.target.value)} autofocus name="title" id="post-title" className="form-control form-control-sm form-control-title" type="text" placeholder="" autocomplete="off" />
          </div>

          <div className="form-group">
            <label for="post-body" className="text-muted mb-1 d-block">
              <small>Description</small>
            </label>
            <input onChange={e => setDescription(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
          </div>
          <div className="form-group">
            <label for="post-body" className="text-muted mb-1 d-block">
              <small>Member count</small>
            </label>
            <input onChange={e => setSize(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="number" />
          </div>
          <div className="form-group">
            <label for="post-body" className="text-muted mb-1 d-block">
              <small>Date/Time</small>
            </label>
            <input onChange={e => setDate(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="datetime-local" />
          </div>
          <div className="form-group">
            <label for="post-body" className="text-muted mb-1 d-block">
              <small>Vanue</small>
            </label>
            <input onChange={e => setVanue(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
          </div>

          <button className="btn btn-primary">Save New Event</button>
        </form>
      </div>
    </>
  )
}

export default CreateEvent
