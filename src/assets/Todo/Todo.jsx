import React, { useState } from 'react'
import './style.css'
import TodoList from './TodoList'
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { addNewTask } from '../../Services/allApi';

function Todo() {

    const [addTask, setAddTask] = useState({
        title: '', description: '', completed: false, createdAt: ''
    })
    const [refreshResponse, setRefreshResponse] = useState('')

    const handleAddTask = async () => {
        const { title, description, completed, createdAt } = addTask

        if (!title || !description) {
            toast.info('fill the title and description')
        } else {
            const updatedTask = {
                ...addTask,
                createdAt: new Date().toISOString()
            };
            const res = await addNewTask(updatedTask)
            if (res.status === 201) {
                setAddTask({
                    title: '', description: '', completed: false, createdAt: ''
                })
                setRefreshResponse(res)
                toast.success('Task Uploaded successfully')

            } else {
                toast.error('task upload failed')
                console.log(res)
            }

        }
    }
    return (
        <>
            <div className='container-fluid w-50 rounded p-2 mt-2 '>
                <Row className="g-3 mt-3 ">
                    <Col md>
                        <FloatingLabel controlId="floatingTitle" label="Task Title">
                            <Form.Control type="text" placeholder='Add Task' className='form-control form-text bg-secondary w-100 text-white' onChange={(e) => { setAddTask({ ...addTask, title: e.target.value }) }} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingDescri" label="Task Description">
                            <Form.Control type="text" placeholder='task description' className='form-control form-text bg-secondary w-100 text-white' onChange={(e) => { setAddTask({ ...addTask, description: e.target.value }) }} />
                        </FloatingLabel>
                    </Col>
                    <Col md className='d-flex align-items-center justify-content-center mt-2'>
                        <button className='btn btn-warning w-100 w-md-auto' onClick={handleAddTask}>+ Add Task</button>
                    </Col>
                </Row>
            </div>
            <div className='mt-5 container-fluid w-50 p-3'>
                <TodoList refreshResponse={refreshResponse} />
            </div>
        </>
    )
}

export default Todo
