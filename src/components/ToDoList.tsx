// Jotai: useAtom, useSetAtom
// Recoil: useRecoilState, useRecoilValue, useRecoilSet
import { useAtom } from "jotai";
import {
  selectedCategoryAtom,
  selectedCategoryTodosAtom,
  todoStatsAtom,
} from "../atoms/todoAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // 선택된 카테고리와 설정 함수
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // 선택된 카테고리의 할일들 (selector 사용)
  const [selectedCategoryTodos] = useAtom(selectedCategoryTodosAtom);

  const [stats] = useAtom(todoStatsAtom);

  const categories = [
    { key: "TO_DO", label: "할 일", count: stats.todo, color: "#ffc107" },
    { key: "DOING", label: "진행 중", count: stats.doing, color: "#17a2b8" },
    { key: "DONE", label: "완료", count: stats.done, color: "#28a745" },
  ] as const;

  const getCategoryLabel = (category: string) => {
    return categories.find((c) => c.key === category)?.label || category;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>To Do List</h1>

      {/* 카테고리 선택 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>카테고리 선택</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          {categories.map(({ key, label, count, color }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              style={{
                padding: "10px 20px",
                border: `2px solid ${color}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor:
                  selectedCategory === key ? color + "20" : "white",
                color: selectedCategory === key ? color : "#333",
              }}
            >
              {label} ({count}개)
            </button>
          ))}
        </div>
      </div>

      <CreateToDo />

      <div style={{ marginTop: "30px" }}>
        <h2>
          {getCategoryLabel(selectedCategory)} 목록 (
          {selectedCategoryTodos.length}개)
        </h2>

        {stats.total === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>할일이 없습니다.</p>
        ) : selectedCategoryTodos.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>
            {getCategoryLabel(selectedCategory)}이 없습니다.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selectedCategoryTodos.map((todo) => (
              <ToDo key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
