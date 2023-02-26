import React, { useEffect } from "react"
import Axios from "axios"

function Requests(props) {
  //console.log(props.requests[0].requestId)

  return (
    <>
      <div class="list-group">
        {props.requests
          ? props.requests.map(({ requestId, username, createdOn }) => {
              // console.log(key)
              return (
                <div href="" class="list-group-item list-group-item-action">
                  <div className="d-flex flex-row justify-content-between">
                    <div>
                      <img className="avatar-tiny" src="https://gravatar.com/avatar" /> <strong>{username}</strong>
                      <span class="text-muted small"> on {new Date(createdOn).toLocaleDateString()} </span>
                    </div>
                    <div>
                      <button
                        onClick={e => {
                          props.handleAccept(e, requestId, username)
                        }}
                        className="btn btn-sm btn-secondary"
                      >
                        Accept
                      </button>
                      <span> </span>
                      <button
                        onClick={e => {
                          props.handleReject(e, requestId, username)
                        }}
                        className="btn btn-sm btn-secondary"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : ""}
      </div>
    </>
  )
}

export default Requests
