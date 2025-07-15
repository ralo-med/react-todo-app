import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      todo: "",
    },
  });

  const onValid = (data: IForm) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text: data.todo,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    reset(); // 폼 초기화
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1>할일 목록</h1>

      <form onSubmit={handleSubmit(onValid)}>
        <div style={{ marginBottom: "20px" }}>
          <input
            {...register("todo", {
              required: "할일을 입력해주세요.",
              minLength: {
                value: 2,
                message: "할일은 2자 이상 입력해주세요.",
              },
            })}
            type="text"
            placeholder="할일을 입력하세요."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          {errors.todo && (
            <p style={{ color: "red", margin: "5px 0" }}>
              {errors.todo.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          할일 추가
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h2>할일 목록 ({todos.length}개)</h2>
        {todos.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>할일이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  border: "1px solid #dee2e6",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ marginRight: "10px" }}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#6c757d" : "#000",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
