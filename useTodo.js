import { useReducer, useEffect, useState } from "react";
import { todoReducer } from "../08-useReducer/todoReducer.js";



const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleTodo = (todo) => {

        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);

    }

    const handleDeleteTodo = (id) => {
        const action = ({
            type: '[TODO] Remove Todo',
            payload: id
        });
        dispatch(action);
    }

    const handleToggleTodo = (id) => {
        const action = ({
            type: '[TODO] Toggle Todo',
            payload: id
        });
        dispatch(action);
    }

    return {
        todosCount: todos.length,
        penndingTodosCount: todos.filter(todo => !todo.done).length,
        todos,
        handleTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}