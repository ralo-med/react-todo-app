import { atom } from "jotai";

export interface ITodo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

// Jotai: atom<Type>(initialValue) - 상태 저장
// Recoil: atom({ key: 'string', default: value }) - 상태 저장
export const todosAtom = atom<ITodo[]>([]);

// 유저가 선택한 카테고리 (기본값: "TO_DO")
export const selectedCategoryAtom = atom<"TO_DO" | "DOING" | "DONE">("TO_DO");

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

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const toggleTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    const newTodos = [...todos];
    const todo = newTodos[index];

    newTodos[index] = {
      ...todo,
      category:
        todo.category === "TO_DO"
          ? "DOING"
          : todo.category === "DOING"
          ? "DONE"
          : "TO_DO",
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
  return {
    todo: todos.filter((todo) => todo.category === "TO_DO"),
    doing: todos.filter((todo) => todo.category === "DOING"),
    done: todos.filter((todo) => todo.category === "DONE"),
  };
});

// 통계 정보 (todosByCategoryAtom 기반으로 계산)
export const todoStatsAtom = atom((get) => {
  const todosByCategory = get(todosByCategoryAtom);
  return {
    total:
      todosByCategory.todo.length +
      todosByCategory.doing.length +
      todosByCategory.done.length,
    todo: todosByCategory.todo.length,
    doing: todosByCategory.doing.length,
    done: todosByCategory.done.length,
  };
});

// 선택된 카테고리의 할일들만 보여주는 selector
export const selectedCategoryTodosAtom = atom((get) => {
  const todosByCategory = get(todosByCategoryAtom);
  const selectedCategory = get(selectedCategoryAtom);

  const categoryMap = {
    TO_DO: todosByCategory.todo,
    DOING: todosByCategory.doing,
    DONE: todosByCategory.done,
  };

  return categoryMap[selectedCategory];
});

// 필요하면 이렇게 계산 가능
// incompleteTodos = [...todosByCategory.todo, ...todosByCategory.doing]
// completedTodos = todosByCategory.done
