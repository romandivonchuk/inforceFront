import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Comment from '../comment'
import ModalCreate from '../model-create/modal-create';
import Button from '@mui/material/Button';
import './details.css';

const Details = () => {

    let { id } = useParams();
    const dispatch = useDispatch()
    const {name, imageUrl, description, comments, count, size, weight, color} = useSelector(state => state.data.find( item => item._id === id))
    const loading = useSelector(state => state.loading)
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function deleteComment(idComment) {
        let ask = window.confirm("Do you real want to delete?")
        if (ask) {
            dispatch({type: 'DELETE_COMMENTS', payload: {idComment: idComment, productId: id}})
        }
    }

    if (loading) {return <h1>loading</h1>}

    return (
        <>  
            <Button variant="outlined" onClick={() => handleOpen(true)}>Edit item</Button>
            <div className="details-item">
                <img className="details-item-img" src={imageUrl} alt={name} />
                <div className="details-item-info">
                    <h3>{name}</h3>
                    <p className="description">description: {description}</p>
                    <p className="count">count: {count} </p>
                    <p className="weight">color: {color} </p>
                    <p className="weight">weight: {weight} </p>
                    <p className="size">hight: <span>{size.height}</span> width: <span>{size.width}</span> </p>
                </div>
            </div>
            <div className="comments">
                <h2>Comments</h2>
                { (comments.length===0) ? <h5>There are no comments</h5>: comments.map((item, idx) => <Comment key={idx.toString()} data={item} deleteComment={(id) => {deleteComment(id)}} disableBtn={false}/>)}
            </div>
            <ModalCreate open={open} edit={true} handleClose={handleClose} data={{id, name, imageUrl, description, comments, count, size, weight, color}}/>
        </>
    )
}

export default Details
