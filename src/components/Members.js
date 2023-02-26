import React, { useEffect } from "react"

function Members(props) {
  console.log(props)
  return (
    <>
      <div class="list-group">
        {props.members
          ? props.members.map(({ memberId, username, createdOn }) => {
              return (
                <a href="#" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar" /> <strong>{username}</strong>
                  <span class="text-muted small">on {new Date(createdOn).toLocaleDateString()} </span>
                </a>
              )
            })
          : ""}
      </div>
    </>
  )
}

export default Members
