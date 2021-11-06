import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {fetchData} from '../../store/actions-creator/getData'
import './main-page.css'
import { CircularProgress } from '@mui/material'
import Item from '../item'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ModalCreate from '../model-create/modal-create'




function MainPage() {

    const {loading, data, reload, error} = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sort, setSort] = useState('none');
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    
    useEffect(() => {
        if (reload) {
            dispatch(fetchData())
            dispatch({type: 'RELOAD', payload: false})
            setOpen(false)
        }
    }, [reload,dispatch])

    const sorted = (sort) => {
        let newData = [...data]
        if (sort === "none") {
           return newData
        }

        if (sort === "count") {
            return newData.sort((a, b) => a.count - b.count)
        }

        if (sort === "name") {
            return newData.sort((a, b) => {
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            })
        }
    }

    if ( error ) { return <h1>ERRROOOR</h1> }
    
    if ( loading ) { 
        return (
        <div className="loading">
            <CircularProgress />
        </div>)
    }
    
    if (data.length) {

        let dataSort = sorted(sort)
        
        return (
            <>
                <div className="menu">
                    <Button variant="outlined" onClick={handleOpen}>add item</Button>
                    <Box sx={{ minWidth: 120,m: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                            value={sort}
                            label="sort"
                            onChange={handleChange}
                            >
                            <MenuItem value={"none"}>filter none</MenuItem>
                            <MenuItem value={"count"}>count</MenuItem>
                            <MenuItem value={"name"}>name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <ModalCreate open={open} handleClose={handleClose}/>         
                <div className="product-list">
                    {dataSort.map((item,idx)=> {
                        return (
                            <React.Fragment key={idx.toString()}>
                                <Item data={item}/>
                            </React.Fragment>
                        )
                    })}
                </div>
            </>
        )
    }
};


export default MainPage
