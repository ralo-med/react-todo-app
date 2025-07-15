// Jotai: useAtom, useSetAtom
// Recoil: useRecoilState, useRecoilValue, useRecoilSet
import { useAtom, useSetAtom } from "jotai";
import {
  selectedCategoryAtom,
  selectedCategoryTodosAtom,
  todoStatsAtom,
  allCategoriesAtom,
  deleteCustomCategoryAtom,
  DefaultCategory,
} from "../atoms/todoAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // 선택된 카테고리와 설정 함수
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // 선택된 카테고리의 할일들 (selector 사용)
  const [selectedCategoryTodos] = useAtom(selectedCategoryTodosAtom);

  const [stats] = useAtom(todoStatsAtom);
  const [allCategories] = useAtom(allCategoriesAtom);
  const deleteCustomCategory = useSetAtom(deleteCustomCategoryAtom);

  const getCategoryLabel = (categoryId: string) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const getCategoryCount = (categoryId: string) => {
    return (stats as Record<string, number>)[categoryId] || 0;
  };

  const isDefaultCategory = (categoryId: string) => {
    return Object.values(DefaultCategory).includes(
      categoryId as DefaultCategory
    );
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    if (
      window.confirm(
        `"${categoryName}" 카테고리를 삭제하시겠습니까? 해당 카테고리의 모든 할일들도 함께 삭제됩니다.`
      )
    ) {
      deleteCustomCategory(categoryId);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        To Do List
      </h1>

      {/* 카테고리 선택 */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#495057",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          카테고리 선택
        </h3>
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {allCategories.map((category) => (
            <div
              key={category.id}
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <button
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: "6px 12px",
                  border: `2px solid ${category.color}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor:
                    selectedCategory === category.id
                      ? category.color + "20"
                      : "white",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  whiteSpace: "nowrap",
                }}
              >
                <span>
                  {category.name} ({getCategoryCount(category.id)}개)
                </span>
                {!isDefaultCategory(category.id) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id, category.name);
                    }}
                    style={{
                      color: "#999",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "1",
                      padding: "1px 4px",
                      borderRadius: "2px",
                      transition: "color 0.2s",
                      marginLeft: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#666";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#999";
                    }}
                    title={`${category.name} 카테고리 삭제`}
                  >
                    ×
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <CreateToDo />

      <div style={{ marginTop: "30px" }}>
        {selectedCategoryTodos.length > 0 ? (
          <>
            <h2>
              {getCategoryLabel(selectedCategory)} (
              {selectedCategoryTodos.length}개)
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedCategoryTodos.map((todo) => (
                <ToDo key={todo.id} todo={todo} />
              ))}
            </ul>
          </>
        ) : stats.total === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>할일이 없습니다.</p>
        ) : (
          <p style={{ color: "#666", textAlign: "center" }}>
            {getCategoryLabel(selectedCategory)}이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
