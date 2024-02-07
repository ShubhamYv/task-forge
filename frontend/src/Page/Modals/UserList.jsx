import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 2,
};

const tasks = [1, 1, 1, 1]

export default function UserList({ handleClose, open }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            tasks.map((item, index) =>
              <>
                <div key={index} className='flex items-center justify-between w-full'>
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src='https://cdn.pixabay.com/photo/2024/01/24/19/06/leaves-8530206_640.jpg'
                        />
                      </ListItemAvatar>
                      <ListItemText primary={"Shubham Yadav"} secondary="@shubham" />
                    </ListItem>
                  </div>
                  <div>
                    <Button className='customButton'>Select</Button>
                  </div>
                </div>
                {index !== tasks.length - 1 && <Divider variant='inset' />}
              </>
            )
          }
        </Box>
      </Modal>
    </div>
  );
}