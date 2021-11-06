import React , { useState,useEffect}from 'react'
import { useDispatch } from 'react-redux';
import {fetchData} from '../../store/actions-creator/getData'

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const CreateItem = (props) => {
  const dispatch = useDispatch();
  const [ message, setMessage] = useState('')
  const [ name, setName] = useState('')
  const [ description, setDescription] = useState('')
  const [ count, setCount] = useState('')
  const [ color, setColor] = useState('')
  const [ width, setWidth] = useState('')
  const [ height, setHeight] = useState('')
  const [ weight, setWeight] = useState('')
  const [ img, setImg] = useState('')

  const [ nameError, setNameError] = useState(false)
  const [ countError, setCountError] = useState(false)

  useEffect(() => {
    if (props.data) {
      const {name, imageUrl, description, count, size, weight, color} = props.data
      setName(name);
      setDescription(description)
      setCount(count);
      setColor(color);
      setWidth(size.width);
      setHeight(size.heigh);
      setWeight(weight);
      setImg(imageUrl);
    }
  }, [props.data])

  const validatorName = () => {
    if (!name.length) {
      setNameError(true)
    } else {
      setNameError(false)
    }

  }
  const validatorCount = () => {
    if (!Number.isInteger(+count) || !name.length) { 
      setCountError(true)
    } else {
      setCountError(false)
    }
  }

  const handleChangeImageInput = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + ' kB',
            base64: reader.result,
            file: file,
        }
        setImg(fileInfo.base64.toString())
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let url = null;
    let imageObj = {
        id: 10000, 
        name: name,
        description: description,
        count: count,
        size: {width: width, heigh:height},
        weight: weight,
        comments: [{
          id: 1,
          productId: 1,
          description: "some text here",
          date: new Date()
        },
        {
          id: 2,
          productId: 1,
          description: "again some text here",
          date: new Date()
        }],
        imageUrl: img
    };

    if (props.data) {
      url = "http://localhost:5000/updateById"
      imageObj._id = props.data.id
    } else {
      url = "http://localhost:5000/postNewProduct"
    }

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(imageObj)
    };
    
    fetch(url, requestOptions)
    .then((result) => {
      console.log("File Sent Successful");
      return result.json()
    })
    .then((res) => {
      setMessage('SENDeD')
      dispatch(fetchData())
      props.handleClose();
    })
    .catch((err) => {
      dispatch({type: 'FETCH_DATA_ERROR', payload: true})
    });
  }

  if (message.length > 0) {return <h1>{message}</h1>} else {
    return (
      <div>
        
          <TextField sx={{ m: 2 }} value={name} label="name" error={nameError}  helperText={nameError && 'putSomthing'} onChange={(e) => setName(e.target.value)} onBlur={validatorName}/>
          <TextField sx={{ m: 2 }} value={description} label="description" onChange={(e) => setDescription(e.target.value)}/>
          <TextField sx={{ m: 2 }} value={count} label="count" error={countError}  helperText={countError && 'must be Number'} onChange={(e) => setCount(e.target.value)} onBlur={validatorCount}/>
          <TextField sx={{ m: 2 }} value={color} label="color" onChange={(e) => setColor(e.target.value)}/>  
          <TextField sx={{ m: 2 }} value={width} label="width" onChange={(e) => setWidth(e.target.value)}/>  
          <TextField sx={{ m: 2 }} value={height} label="height" onChange={(e) => setHeight(e.target.value)}/>  
          <TextField sx={{ m: 2 }} value={weight} label="weight" onChange={(e) => setWeight(e.target.value)}/>
          <Button sx={{ m: 2 }}
            variant="contained"
            component="label"
            color={img ? "success" : "secondary"}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => handleChangeImageInput(e) }
            />
          </Button>  
          <Button sx={{ m: 2 }}
          variant="contained"
          component="label"
          onClick={(e) => onSubmit(e)}
          >
          {props.edit ? 'EDIT' : 'ADD'}
          </Button>  
      </div>
    )
  }
}

export default CreateItem
