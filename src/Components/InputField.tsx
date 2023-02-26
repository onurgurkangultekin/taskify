import { FC, useRef } from "react";

interface Props {
  todo: string;
  setTodo: (todo: string) => void;
  handleAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(event) => {
        handleAdd(event);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
        placeholder="Enter a task"
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
