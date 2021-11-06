import React from 'react'
import "./comment.css"

const Comment = (props) => {
    const {id,description, date} = props.data
    return (
        <div className="comment-item">
            <div className="date">date:{date.substring(5,10).replace("-",".")}</div>
            <div className="description">{description}</div>
            <button disabled={props.disableBtn} onClick={() => props.deleteComment(id)} className="delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    )
}

export default Comment
