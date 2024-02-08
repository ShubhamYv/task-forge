import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formateDate } from '../../Config/formateDate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 4,
};

const tags = ["Python", "Java", "React", "Node"]
export default function CreateNewTaskForm({ handleClose, open }) {

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date()
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const [selectedTags, setSelectedTags] = useState([])

  const handleTagsChange = (event, value) => {
    setSelectedTags(value)
  }


  const handleDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { deadline } = formData;
    formData.deadline = formateDate(deadline);
    formData.tags = selectedTags
    console.log(formData)
    handleClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Image"
                  fullWidth
                  name='image'
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-limit-text"
                  options={tags}
                  onChange={handleTagsChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      label="Tags"
                      fullWidth
                      {...params}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    className='w-full'
                    label="Deadline"
                    onChange={handleDeadlineChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{ padding: '0.9rem' }}
                  className='customButton'
                  type='submit'
                  onClick={handleSubmit}
                >
                  Create Task
                </Button>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
