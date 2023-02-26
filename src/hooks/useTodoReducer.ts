import { useReducer } from "react";
import { Todo } from "../model";

export type Actions =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "done"; payload: number }
  | { type: "edit"; payload: { id: number; todo: string } }
  | { type: "dragdrop"; payload: Todo[] };

const todoReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "add":
      const todo: Todo = { id: Date.now(), todo: action.payload, isDone: false };
      return [...state, todo];
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) => (todo.id !== action.payload ? todo : { ...todo, isDone: !todo.isDone }));
    case "edit":
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo));
    case "dragdrop":
      return action.payload;
    default:
      return state;
  }
};

const useTodoReducer = (initialTodos: Todo[]) => {
  const [todos, setTodos] = useReducer(todoReducer, initialTodos);
  return { todos, setTodos };
};

export default useTodoReducer;
