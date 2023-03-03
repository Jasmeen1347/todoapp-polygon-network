import React, { useEffect, useState } from "react";
import { FormGroup, Input, InputGroup, Button, Form, Spinner } from "reactstrap";
import { ethers } from 'ethers';
import contractAbi from '../abi/abi.json'

const TodoForm = ({state, reload, setReload, contractAddres}) => {

    const [todoString, setTodoString] = useState("")
    const [isSCCalling, setIsSCCalling] = useState(false)

    useEffect(() => {
        console.log(state);
    }, [])

    const addTask = async () => {
        const contract = await new ethers.Contract(contractAddres, contractAbi, state.signer)
        const txn = await contract.addTask(todoString, false, { gasPrice: 20e9 })
        setIsSCCalling(true)
        await txn.wait()
        console.log('data saved');
        setReload(!reload)
        setIsSCCalling(false)
    }

    return (
        <Form>
            <FormGroup>
                <InputGroup>
                    <Input
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Enter Your Next Task"
                        value={todoString}
                        onChange={e => setTodoString(e.target.value)}
                    />
                    <div>
                        {!isSCCalling && (
                            <Button color="warning" onClick={() => addTask()}>Add</Button>
                        )}
                        {isSCCalling && (
                            <Button
                            color="primary"
                            disabled
                            >
                            <Spinner size="sm">
                                Loading...
                            </Spinner>
                            <span>
                                {' '}Add
                            </span>
                            </Button>
                        )}
                        
                    </div>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default TodoForm;

