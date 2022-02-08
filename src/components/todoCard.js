import { AccountCircleOutlined, TaskOutlined, Delete, Done, HomeOutlined, WorkOutlined } from '@mui/icons-material';
import { Avatar, Card, CardHeader, IconButton, Tooltip, Zoom, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';

export default function TodoCard(props) {
    const [completed, setCompleted] = React.useState(props.todo.isCompleted);
    const markCompleted = (todo) => {
        axios.put(`http://localhost:5000/done/${todo._id}`, {}, { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                if (res.status === 200) {
                    setCompleted(true);
                }
            }).catch((err) => {
                console.log(err);
            });
    }
    const deleteTodo = (todo) => {
        axios.delete(`http://localhost:5000/delete/${todo._id}`, { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                if (res.status === 200) {
                    props.handleDelete(todo);
                }
            }).catch((err) => {
                console.log(err);
            });
    }
    return <div>
        <Tooltip arrow title={props.todo.description} TransitionComponent={Zoom}>
            <Card sx={{ marginY: '5px', marginX: `${props.margin}` }}>
                <CardHeader avatar={<Avatar sx={{ bgcolor: completed ? '#EDF7ED' : '#FFF4E5' }}>
                    {props.todo.category === "Personal" ? <AccountCircleOutlined sx={{ color: completed ? '#5CB660' : '#FFA117' }} /> : (props.todo.category === "Work" ? <WorkOutlined sx={{ color: completed ? '#5CB660' : '#FFA117' }} /> : (props.todo.category == "Home" ? <HomeOutlined sx={{ color: completed ? '#5CB660' : '#FFA117' }} /> : <TaskOutlined sx={{ color: completed ? '#5CB660' : '#FFA117' }} />))}
                </Avatar>} action={<span>
                    <Tooltip arrow title="Mark as Done" TransitionComponent={Zoom}>
                        <IconButton
                            size="large"
                            onClick={() => markCompleted(props.todo)}
                            color="inherit"
                            disabled={completed}
                        >
                            <Done sx={{ color: '#5CB660' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete" TransitionComponent={Zoom}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => deleteTodo(props.todo)}
                        >
                            <Delete sx={{ color: '#ff0000' }} />
                        </IconButton>
                    </Tooltip>
                </span>}
                    title={<Typography variant='body1' noWrap sx={{ maxWidth: '40vw', textDecoration: completed ? 'line-through' : 'none' }}>{props.todo.title}</Typography>} />
            </Card>
        </Tooltip>
    </div>;
}
