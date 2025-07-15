import { useSetAtom, useAtom } from "jotai";
import {
  ITodo,
  toggleTodoAtom,
  deleteTodoAtom,
  completeTodoAtom,
  allCategoriesAtom,
  DefaultCategory,
} from "../atoms/todoAtom";

interface ToDoProps {
  todo: ITodo;
}

function ToDo({ todo }: ToDoProps) {
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);
  const completeTodo = useSetAtom(completeTodoAtom);
  const [allCategories] = useAtom(allCategoriesAtom);

  const getCategoryStyle = (categoryId: string) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (!category) return {};

    const baseStyle = {
      backgroundColor: category.color + "20",
      border: `1px solid ${category.color}`,
      color: "#333",
    };

    // 완료된 카테고리는 취소선 추가
    if (categoryId === DefaultCategory.DONE) {
      return {
        ...baseStyle,
        textDecoration: "line-through",
      };
    }

    return baseStyle;
  };

  const getButtonText = (categoryId: string) => {
    const currentIndex = allCategories.findIndex(
      (cat) => cat.id === categoryId
    );
    const nextIndex = (currentIndex + 1) % allCategories.length;
    const nextCategory = allCategories[nextIndex];

    if (nextCategory) {
      return nextCategory.name;
    }
    return "변경";
  };

  const getButtonColor = (categoryId: string) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return category?.color || "#007bff";
  };

  const isTodo = todo.category === DefaultCategory.TO_DO;

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
          {isTodo && (
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
              진행중
            </button>
          )}
          {isTodo && (
            <button
              onClick={() => completeTodo(todo.id)}
              style={{
                padding: "3px 8px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                marginRight: "5px",
              }}
            >
              완료
            </button>
          )}
          {!isTodo && (
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
          )}
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
