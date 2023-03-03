import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { FaCheckDouble } from "react-icons/fa"
import { ethers } from 'ethers';
import contractAbi from '../abi/abi.json'

const Todo = ({state, reload, contractAddres}) => {
    const [todos, setTodos] = useState([])
    const [isSCCalling, setIsSCCalling] = useState(false)

    useEffect(() => {
        getTasks()
        const { ethereum } = window;
        if (ethereum) {
            window.ethereum.on('accountsChanged', () => {
                getTasks([])
            })
          }
    }, [])

    useEffect(() => {
        getTasks()
    }, [reload])

    const getTasks = async () => {
        setIsSCCalling(true)
        const contract = await new ethers.Contract(contractAddres, contractAbi, state.signer)
        const txn = await contract.getList()
        // const result = await txn.wait()
        console.log(txn);  
        setTodos(txn)
        setIsSCCalling(false)
    }

    const markTask = async (id) => {
        const contract = await new ethers.Contract(contractAddres, contractAbi, state.signer)
        const txn = await contract.markTask(id, { gasPrice: 20e9 })
        setIsSCCalling(true)
        await txn.wait()
        getTasks()
    }

    return (
        <ListGroup className="mt-5 mb-2 items">
        {isSCCalling && (
        <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
        />
        )}
        {todos.length == 0 && !isSCCalling && (
           <p>Data Not Found</p>
        )}
        {todos.length > 0 && todos.map(todo => (
            <ListGroupItem key={ethers.utils.formatEther(todo.id)} className={`${todo.isCompleted ? 'completedTodo': ''}`}>
                {todo.title}
                <span className="float-right" onClick={() => markTask(todo.id)}><FaCheckDouble /></span>
            </ListGroupItem>
        ))}
    </ListGroup>
    )

}

export default Todo;