// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TodoList {

    struct Todo{
        uint id;
        string title;
        bool isCompleted;
    }

    mapping(address=>Todo[]) todos;  // for find out user wise

    Todo[] private todolist;


    function addTask(string memory _title, bool _isCompleted) public {
        uint newID = todolist.length;
        todolist.push(Todo(newID, _title, _isCompleted));
        todos[msg.sender].push(Todo(newID, _title, _isCompleted));
    }

    function getList() public view returns(Todo[] memory) {
        return todos[msg.sender];
    }

    function markTask(uint _id) public {
        for(uint i = 0; i < todolist.length; i++) {
            if(todolist[i].id == _id) {
                todolist[i].isCompleted = !todolist[i].isCompleted;
                todos[msg.sender][i].isCompleted = !todos[msg.sender][i].isCompleted;
            }
        }
    }

}