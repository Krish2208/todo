import React from 'react';
import Header from './header';
import { Grid, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Fab, Modal, Paper, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Summary from './summary';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Add, ExpandMore } from '@mui/icons-material';
import TodoCard from './todoCard';
import axios from 'axios';

const styleDesktop = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '60vh',
    bgcolor: 'white',
};

const styleMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    bgcolor: 'white',
    overflowY: 'auto'
};

export default function Todo() {
    const [todoList, setTodoList] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:5000/todos', { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                if (res.status === 200) {
                    setTodoList(res.data.todos);
                }
            })
    }, [])
    const [expanded, setExpanded] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleSubmit = () => {
        const date = new Date()
        axios.post('http://localhost:5000/todo', {
            title: title,
            category: category,
            description: description,
            createdOn: date.toDateString,
        }, { headers: { token: localStorage.getItem('token') } }).then(res => {
            if (res.status === 200) {
                let todo = res.data.todo;
                setTodoList([...todoList, todo]);
                setTitle("");
                setCategory("");
                setDescription("");
                handleModalClose();
            }
            else {
                console.log("failed")
            }
        }).catch(() => {
            console.log("failed");
        });
    };
    const handleDelete = (deletedTodo) => {
        let newList = todoList.filter((todoitm) => todoitm._id != deletedTodo._id);
        setTodoList(newList);
    }
    const matches = useMediaQuery('(max-width:600px)');
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }
    return (
        <div>
            <Grid container component="main">
                <Box sx={{ width: '100vw' }}>
                    <Header />
                </Box>
                <Box sx={{ width: '100vw', marginX: 2, marginTop: 3 }}>
                    {matches ? <Accordion disableGutters elevation={4} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMore />}><Typography variant='h5'>Summary</Typography></AccordionSummary>
                        <AccordionDetails><Summary ma='8px' total={todoList.length} completed={(todoList.filter((todoitm) => todoitm.isCompleted === true)).length} /></AccordionDetails>
                    </Accordion> : <Summary total={todoList.length} completed={(todoList.filter((todoitm) => todoitm.isCompleted === true)).length} />}
                </Box>
                <Box sx={{ width: '100vw', marginX: 2, marginTop: 3, overflowY: 'scroll', height: '60vh' }}>
                    {matches ? <Accordion disableGutters elevation={4} expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
                        <AccordionSummary expandIcon={<ExpandMore />}><Typography variant='h5'>Tasks</Typography></AccordionSummary>
                        <AccordionDetails>{todoList.map((todo) => (
                            <TodoCard todo={todo} handleDelete={handleDelete} />
                        ))}</AccordionDetails>
                    </Accordion> : todoList.map((todo) => (
                        <TodoCard todo={todo} handleDelete={handleDelete} margin={"30px"} />
                    ))}
                </Box>
            </Grid>
            <Fab sx={{ position: 'absolute', bottom: 30, right: 30 }} color="primary" onClick={handleModalOpen}>
                <Add style={{ color: 'white' }} />
            </Fab>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box style={matches ? styleMobile : styleDesktop}>
                    <Paper elevation={0} sx={{ p: 2 }}>
                        <Box component="form" sx={{ my: 2, mx: 3 }} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Title"
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                multiline
                                fullWidth
                                label="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <FormControl fullWidth margin='normal'>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    margin="normal"
                                    label="Category"
                                    value={category}
                                    onChange={handleCategory}
                                >
                                    <MenuItem value={"Personal"}>Personal</MenuItem>
                                    <MenuItem value={"Home"}>Home</MenuItem>
                                    <MenuItem value={"Work"}>Work</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2, }}
                                onClick={() => handleSubmit()}
                            >
                                Create
                            </Button>
                            <Grid container>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
}