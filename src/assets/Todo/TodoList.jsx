import React, { useEffect, useState } from 'react'
import './style.css'
import { Row, Col, Button } from 'react-bootstrap'
import { getAllTasks, deleteTask, markAsCompleted, getSpecificTask } from '../../Services/allApi'
import { toast } from 'react-toastify'

function TodoList({ refreshResponse }) {

    const [task, setTask] = useState([])

    const getTasks = async () => {
        const res = await getAllTasks()
        // console.log(res)
        setTask(res.data)
    }

    const markComplete = async (id) => {
        const resp = await getSpecificTask(id)
        if (resp.status === 200) {
            const task = resp.data
            task.completed = true
            console.log(task)
            const completeTask = await markAsCompleted(id, task)
            if (completeTask.status === 200) {
                toast.success('Task Completed')
                getTasks()
            } else {
                toast.info('something went wrong')
                console.log(completeTask)
            }
        }
    }

    const rmvTask = async (id) => {
        const res = await deleteTask(id)
        if (res.status === 200) {
            console.log(res)
            getTasks()
        }
    }

    useEffect(() => {
        getTasks()
    }, [refreshResponse])
    return (
        <>
            <div className='shadow-lg p-1'>
                {task.length > 0 &&
                    <div className='p-1'>
                        {task.map((i) => (
                            <div className='box py-2 mb-3' key={i.id}>
                                <Row className='w-100 d-flex justify-content-between'>
                                    <Col sm={12} md={6}>
                                        <div className='ps-3'>
                                            <span> Task : {i.title}</span>
                                            <p>Description :  {i.description}</p>
                                        </div>
                                    </Col>
                                    <Col sm={12} md={6} className='d-flex justify-content-md-end justify-content-center mt-2 mt-md-0 overflow-auto'>
                                        {i.completed ?
                                            <div className='d-flex align-items-center'>
                                                <span className='mx-1 w-auto badge bg-success'>Task Completed</span>
                                            </div>
                                            :
                                            <Button className='btn btn-primary mx-1 w-auto' onClick={() => { markComplete(i.id) }} data-toggle="tooltip"
                                                data-placement="top"
                                                title="Mark as Completed">✅</Button>
                                        }
                                        <Button className='btn btn-danger  w-auto' data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete" onClick={() => { rmvTask(i.id) }}><i className="fa-solid fa-trash" />
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}

                    </div>
                }
            </div>
        </>
    )
}

export default TodoList
