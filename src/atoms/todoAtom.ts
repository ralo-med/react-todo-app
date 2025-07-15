import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 기본 카테고리 enum 정의
export enum DefaultCategory {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

// 커스텀 카테고리 타입
export interface ICustomCategory {
  id: string;
  name: string;
  color: string;
}

export interface ITodo {
  id: number;
  text: string;
  category: string; // 이제 string으로 변경 (기본 + 커스텀 카테고리 모두 지원)
}

// Jotai: atomWithStorage<Type>(key, initialValue) - localStorage와 연동된 상태 저장
export const todosAtom = atomWithStorage<ITodo[]>("todos", []);

// 커스텀 카테고리들 (localStorage 연동)
export const customCategoriesAtom = atomWithStorage<ICustomCategory[]>(
  "customCategories",
  []
);

// 유저가 선택한 카테고리 (localStorage 연동)
export const selectedCategoryAtom = atomWithStorage<string>(
  "selectedCategory",
  DefaultCategory.TO_DO
);

// 모든 카테고리 (기본 + 커스텀)
export const allCategoriesAtom = atom((get) => {
  const customCategories = get(customCategoriesAtom);
  return [
    { id: DefaultCategory.TO_DO, name: "할 일", color: "#ffc107" },
    { id: DefaultCategory.DOING, name: "진행 중", color: "#17a2b8" },
    { id: DefaultCategory.DONE, name: "완료", color: "#28a745" },
    ...customCategories,
  ];
});

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const addTodoAtom = atom(null, (get, set, text: string) => {
  const todos = get(todosAtom);
  const selectedCategory = get(selectedCategoryAtom);
  const newTodo: ITodo = {
    id: Date.now(),
    text,
    category: selectedCategory,
  };
  set(todosAtom, [...todos, newTodo]);
});

// 커스텀 카테고리 추가
export const addCustomCategoryAtom = atom(
  null,
  (get, set, category: Omit<ICustomCategory, "id">) => {
    const customCategories = get(customCategoriesAtom);
    const newCategory: ICustomCategory = {
      id: `custom_${Date.now()}`,
      ...category,
    };
    set(customCategoriesAtom, [...customCategories, newCategory]);
  }
);

// 커스텀 카테고리 삭제
export const deleteCustomCategoryAtom = atom(
  null,
  (get, set, categoryId: string) => {
    const customCategories = get(customCategoriesAtom);
    const todos = get(todosAtom);
    const selectedCategory = get(selectedCategoryAtom);

    // 해당 카테고리의 할일들도 함께 삭제 (cascade)
    const updatedTodos = todos.filter((todo) => todo.category !== categoryId);

    // 삭제된 카테고리가 현재 선택된 카테고리라면 기본 카테고리로 변경
    if (selectedCategory === categoryId) {
      set(selectedCategoryAtom, DefaultCategory.TO_DO);
    }

    set(todosAtom, updatedTodos);
    set(
      customCategoriesAtom,
      customCategories.filter((cat) => cat.id !== categoryId)
    );
  }
);

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const completeTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      category: DefaultCategory.DONE,
    };
    set(todosAtom, newTodos);
  }
});

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const toggleTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  const allCategories = get(allCategoriesAtom);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    const newTodos = [...todos];
    const todo = newTodos[index];
    const currentIndex = allCategories.findIndex(
      (cat) => cat.id === todo.category
    );
    const nextIndex = (currentIndex + 1) % allCategories.length;
    //개쩌네 ㅋㅋ 순환해서 다시 1번으로 돌아가도록

    newTodos[index] = {
      ...todo,
      category: allCategories[nextIndex].id,
    };

    set(todosAtom, newTodos);
  }
});

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const deleteTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.filter((todo) => todo.id !== id)
  );
});

// Jotai: atom((get) => { ... }) - 파생된 상태 (selector 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {} }) - 파생된 상태
export const todosByCategoryAtom = atom((get) => {
  const todos = get(todosAtom);
  const allCategories = get(allCategoriesAtom);

  const result: Record<string, ITodo[]> = {};

  allCategories.forEach((category) => {
    result[category.id] = todos.filter((todo) => todo.category === category.id);
  });

  return result;
});

// 통계 정보 (todosByCategoryAtom 기반으로 계산)
export const todoStatsAtom = atom((get) => {
  const todosByCategory = get(todosByCategoryAtom);
  const allCategories = get(allCategoriesAtom);

  const stats: Record<string, number> = {};
  let total = 0;

  allCategories.forEach((category) => {
    const count = todosByCategory[category.id]?.length || 0;
    stats[category.id] = count;
    total += count;
  });

  return {
    total,
    ...stats,
  };
});

// 선택된 카테고리의 할일들만 보여주는 selector
export const selectedCategoryTodosAtom = atom((get) => {
  const todosByCategory = get(todosByCategoryAtom);
  const selectedCategory = get(selectedCategoryAtom);

  return todosByCategory[selectedCategory] || [];
});

// 필요하면 이렇게 계산 가능
// incompleteTodos = [...todosByCategory.todo, ...todosByCategory.doing]
// completedTodos = todosByCategory.done
