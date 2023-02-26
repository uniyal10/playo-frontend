import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Members from "./Members"
import Requests from "./Requests"

function SingleEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [eventData, setEventData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRequested, setRequest] = useState(false)
  const [isAccepted, setAccepted] = useState(false)
  const [isRejected, setRejected] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(`http://localhost:8080/events/${id}`)
        if (response) {
          setEventData(response.data)
          setIsLoading(false)

          // checkIsRequestedOrNot()
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    function checkIsRequestedOrNot() {
      if (eventData.requests) {
        eventData.requests.map(({ requestId }) => {
          if (requestId === localStorage.getItem("sportoAppuserid")) {
            setRequest(true)
            //console.log(request)s
          }
        })
      }
    }
    function checkIsAcceptedOrNot() {
      if (eventData.members) {
        eventData.members.map(({ memberId }) => {
          if (memberId === localStorage.getItem("sportoAppuserid")) {
            setAccepted(true)
            //console.log(request)
          }
        })
      }
    }
    checkIsRequestedOrNot()
    checkIsAcceptedOrNot()
  }, [eventData])

  function handleJoin() {
    Axios.post("http://localhost:8080/events/request", { eventId: id, user: { requestId: localStorage.getItem("sportoAppuserid"), username: localStorage.getItem("sportoAppusername") } })
      .then(function (response) {
        setRequest(true)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  function handleAccept(e, requestedId, username) {
    console.log(requestedId)
    Axios.post("http://localhost:8080/events/accept", { eventId: id, user: { requestId: requestedId, username: username } })
      .then(function () {
        setAccepted(true)
        eventData.requests = eventData.requests.filter(({ requestId }) => requestId !== requestedId)
        eventData.members.push({ memberId: requestedId, username: username, createdOn: new Date() })
      })
      .catch(err => {
        console.log("something wrong")
      })
  }

  function handleReject(event, requestedId) {
    console.log(requestedId)
    Axios.post("http://localhost:8080/events/reject", { eventId: id, requestId: requestedId })
      .then(function () {
        setRequest(false)
        setRejected(true)
        eventData.requests = eventData.requests.filter(({ requestId }) => requestId !== requestedId)
      })
      .catch(err => {
        console.log("something wrong")
      })
  }
  if (isLoading) return <div>Loading .....</div>
  const dateOfEvent = new Date(eventData.date)
  const eventCreatedDate = new Date(eventData.createdDate)

  return (
    <>
      <div class="container container--narrow py-md-10">
        <div class="d-flex justify-content-between">
          <h2>{eventData.eventname}</h2>
        </div>

        {/* 
<p class="text-muted small mb-4">
          <a href="#">
            <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" />
          </a>
          Created by <a href="#">{eventData.user.username}</a> on {eventData.createdDate}
        </p> */}

        <div>
          <div>
            <h1>About Event</h1>
            <p>{eventData.description}</p>
            <p>Event size: {eventData.size} </p>
            <p> Added Members: {eventData.members ? eventData.members.length : "0"}</p>
            <Members members={eventData.members} />
            {eventData.user.id === localStorage.getItem("sportoAppuserid") ? (
              <div>
                {" "}
                <p> Join Requests: {eventData.requests ? eventData.requests.length : "0"}</p>
                <Requests requests={eventData.requests} handleAccept={handleAccept} handleReject={handleReject} />
              </div>
            ) : (
              ""
            )}
          </div>

          <div class="d-flex justify-content-between">
            <h3>
              <i class="fa-solid fa-calendar-days"></i>
              {dateOfEvent.toDateString()}
              <div></div>
              <i class="fa-solid fa-alarm-clock"></i>
              {dateOfEvent.toLocaleTimeString()}
              <h1>Vanue:{eventData.vanue}</h1>
            </h3>
          </div>
          <div class="d-flex justify-content-between">
            <h3>
              Created by {eventData.user.username} on {eventCreatedDate.toDateString()}
            </h3>
          </div>
          {eventData.size > eventData.members.length ? (
            !isRequested && !isAccepted && eventData.user.id !== localStorage.getItem("sportoAppuserid") ? (
              <button onClick={handleJoin} className="btn btn-sm btn-secondary">
                Join Event
              </button>
            ) : isAccepted && eventData.user.id !== localStorage.getItem("sportoAppuserid") ? (
              <button className="btn btn-sm btn-success" disabled>
                Joined
              </button>
            ) : isRequested && eventData.user.id !== localStorage.getItem("sportoAppuserid") ? (
              <button onClick={handleJoin} className="btn btn-sm btn-danger" disabled>
                Requested
              </button>
            ) : (
              ""
            )
          ) : (
            <button className="btn btn-sm btn-warning" disabled>
              Event is Full
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default SingleEvent
