// Jotai: useAtom, useSetAtom
// Recoil: useRecoilState, useRecoilValue, useRecoilSet
import { useAtom } from "jotai";
import { todosAtom } from "../atoms/todoAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // Jotai: const [todos] = useAtom(todosAtom) - 읽기 전용 (구조분해할당)
  // Recoil: const todos = useRecoilValue(todosState) - 읽기 전용
  const [todos] = useAtom(todosAtom);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>To Do List </h1>

      <CreateToDo />

      <div style={{ marginTop: "30px" }}>
        <h2>To Do List ({todos.length}개)</h2>
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
                    <ToDo key={todo.id} todo={todo} />
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
                    <ToDo key={todo.id} todo={todo} />
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
                    <ToDo key={todo.id} todo={todo} />
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
