import React from 'react'
import CreateItem from '../create-item/create-item'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '5%',
  left: '40%',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCreate = (props) => {
  return (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box {...style}>
            <CreateItem data={props.data} handleClose={props.handleClose} edit={props.edit}/>
        </Box>
    </Modal>
  )
}

export default ModalCreate

