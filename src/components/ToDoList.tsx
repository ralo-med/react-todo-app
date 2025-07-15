// Jotai: useAtom, useSetAtom
// Recoil: useRecoilState, useRecoilValue, useRecoilSet
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  todosAtom,
  addTodoAtom,
  toggleTodoAtom,
  deleteTodoAtom,
} from "../atoms/todoAtom";

interface IForm {
  todo: string;
}

function ToDoList() {
  // Jotai: const [todos] = useAtom(todosAtom) - 읽기 전용 (구조분해할당)
  // Recoil: const todos = useRecoilValue(todosState) - 읽기 전용
  const [todos] = useAtom(todosAtom);

  // Jotai: const addTodo = useSetAtom(addTodoAtom) - 쓰기 전용 (action atom)
  // Recoil: const setTodos = useRecoilSet(todosState) - 쓰기 전용
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

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
    addTodo(data.todo);
    reset(); // 폼 초기화
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>할일 목록 (Jotai)</h1>

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            {/* TO_DO */}
            <div>
              <h3 style={{ color: "#dc3545", marginBottom: "10px" }}>할 일</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos
                  .filter((todo) => todo.category === "TO_DO")
                  .map((todo) => (
                    <li
                      key={todo.id}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#fff3cd",
                        borderRadius: "4px",
                        border: "1px solid #ffeaa7",
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
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          >
                            진행
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
                  ))}
              </ul>
            </div>

            {/* DOING */}
            <div>
              <h3 style={{ color: "#ffc107", marginBottom: "10px" }}>
                진행 중
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos
                  .filter((todo) => todo.category === "DOING")
                  .map((todo) => (
                    <li
                      key={todo.id}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#d1ecf1",
                        borderRadius: "4px",
                        border: "1px solid #bee5eb",
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
                              backgroundColor: "#17a2b8",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          >
                            완료
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
                  ))}
              </ul>
            </div>

            {/* DONE */}
            <div>
              <h3 style={{ color: "#28a745", marginBottom: "10px" }}>완료</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos
                  .filter((todo) => todo.category === "DONE")
                  .map((todo) => (
                    <li
                      key={todo.id}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#d4edda",
                        borderRadius: "4px",
                        border: "1px solid #c3e6cb",
                        textDecoration: "line-through",
                        color: "#6c757d",
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
                              backgroundColor: "#6c757d",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          >
                            재시작
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
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
