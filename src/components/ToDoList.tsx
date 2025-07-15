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
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <ToDo key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
