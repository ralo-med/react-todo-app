import { useSetAtom } from "jotai";
import { ITodo, toggleTodoAtom, deleteTodoAtom } from "../atoms/todoAtom";

interface ToDoProps {
  todo: ITodo;
}

function ToDo({ todo }: ToDoProps) {
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "TO_DO":
        return {
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          color: "#dc3545",
        };
      case "DOING":
        return {
          backgroundColor: "#d1ecf1",
          border: "1px solid #bee5eb",
          color: "#ffc107",
        };
      case "DONE":
        return {
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          color: "#28a745",
          textDecoration: "line-through",
        };
      default:
        return {};
    }
  };

  const getButtonText = (category: string) => {
    switch (category) {
      case "TO_DO":
        return "진행";
      case "DOING":
        return "완료";
      case "DONE":
        return "재시작";
      default:
        return "변경";
    }
  };

  const getButtonColor = (category: string) => {
    switch (category) {
      case "TO_DO":
        return "#28a745";
      case "DOING":
        return "#17a2b8";
      case "DONE":
        return "#6c757d";
      default:
        return "#007bff";
    }
  };

  return (
    <li
      style={{
        padding: "10px",
        margin: "5px 0",
        borderRadius: "4px",
        ...getCategoryStyle(todo.category),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{todo.text}</span>
        <div>
          <button
            onClick={() => toggleTodo(todo.id)}
            style={{
              padding: "3px 8px",
              backgroundColor: getButtonColor(todo.category),
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              marginRight: "5px",
            }}
          >
            {getButtonText(todo.category)}
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              padding: "3px 8px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}

export default ToDo;
