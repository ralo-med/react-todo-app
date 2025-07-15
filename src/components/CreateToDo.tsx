import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  addTodoAtom,
  addCustomCategoryAtom,
  allCategoriesAtom,
} from "../atoms/todoAtom";

function CreateToDo() {
  const [text, setText] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#6c757d");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const addTodo = useSetAtom(addTodoAtom);
  const addCustomCategory = useSetAtom(addCustomCategoryAtom);
  const [allCategories] = useAtom(allCategoriesAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCustomCategory({
        name: newCategoryName.trim(),
        color: newCategoryColor,
      });
      setNewCategoryName("");
      setNewCategoryColor("#6c757d");
      setShowAddCategory(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* 할일 추가 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할일을 입력하세요"
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            추가
          </button>
        </div>
      </form>

      {/* 카테고리 관리 */}
      <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h4 style={{ margin: 0 }}>카테고리 관리</h4>
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {showAddCategory ? "취소" : "카테고리 추가"}
          </button>
        </div>

        {/* 현재 카테고리 목록 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          {allCategories.map(
            (category: { id: string; name: string; color: string }) => (
              <span
                key={category.id}
                style={{
                  padding: "4px 8px",
                  backgroundColor: category.color + "20",
                  border: `1px solid ${category.color}`,
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#333",
                }}
              >
                {category.name}
              </span>
            )
          )}
        </div>

        {/* 커스텀 카테고리 추가 폼 */}
        {showAddCategory && (
          <form
            onSubmit={handleAddCategory}
            style={{
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              border: "1px solid #dee2e6",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="카테고리 이름"
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              <input
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                style={{
                  width: "40px",
                  height: "35px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                카테고리 추가
              </button>
              <button
                type="button"
                onClick={() => setShowAddCategory(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                취소
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateToDo;
