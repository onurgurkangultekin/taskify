import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Actions } from "../hooks/useTodoReducer";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<Actions>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<Actions>;
}

const TodoList: FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosComplete">
        {(provided, snapshot) => (
          <div
            className={`todos complete ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} todos={completedTodos} setTodos={setCompletedTodos} key={todo.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
