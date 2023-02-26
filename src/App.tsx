import React, { FC, useState } from "react";
import "./App.css";
import InputField from "./Components/InputField";
import TodoList from "./Components/TodoList";
import "./styles.css";
import useTodoReducer from "./hooks/useTodoReducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const { todos, setTodos } = useTodoReducer([]);
  const { todos: completedTodos, setTodos: setCompletedTodos } = useTodoReducer([]);

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo) {
      setTodos({ type: "add", payload: todo });
      setTodo("");
      console.log(todos);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos({ type: "dragdrop", payload: complete });
    setTodos({ type: "dragdrop", payload: active });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
