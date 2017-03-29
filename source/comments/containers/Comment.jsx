import React from 'react';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto:${props.email}`}> {props.name} </a>
      </div>
    </article>
  )

}

export default Comment;

