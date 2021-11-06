import React from 'react'
import './item.css'
import deteleData from '../../store/actions-creator/deleteData'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Item = (props) => {
    const { data: {_id, imageUrl, name, count, description} } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteItem = () => {
        let ask = window.confirm("Do you real want to delete?")
        if (ask) {
            dispatch(deteleData(_id))
        }
    }

    return (
        <Card  sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={`${imageUrl}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    InStock: {count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description.substring(0,27)+"..."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button  onClick={() => history.push(_id)} size="small">More Details</Button>
                <Button onClick={deleteItem} size="small">Delete</Button>
            </CardActions>
        </Card>

    )
}

export default Item
