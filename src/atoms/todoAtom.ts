import { atom } from "jotai";

export interface ITodo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

// Jotai: atom<Type>(initialValue) - 상태 저장
// Recoil: atom({ key: 'string', default: value }) - 상태 저장
export const todosAtom = atom<ITodo[]>([]);

// Jotai: atom(null, (get, set, param) => { ... }) - 액션 (setTodos 역할)
// Recoil: selector({ key: 'string', get: ({get}) => {}, set: ({get, set}, param) => {} }) - 액션
export const addTodoAtom = atom(null, (get, set, text: string) => {
  const todos = get(todosAtom);
  const newTodo: ITodo = {
    id: Date.now(),
    text,
    category: "TO_DO",
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
export const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    total: todos.length,
    todo: todos.filter((todo) => todo.category === "TO_DO").length,
    doing: todos.filter((todo) => todo.category === "DOING").length,
    done: todos.filter((todo) => todo.category === "DONE").length,
  };
});

// 이렇게만 있어도 됨
export const todosByCategoryAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    todo: todos.filter((todo) => todo.category === "TO_DO"),
    doing: todos.filter((todo) => todo.category === "DOING"),
    done: todos.filter((todo) => todo.category === "DONE"),
  };
});

// 필요하면 이렇게 계산 가능
// incompleteTodos = [...todosByCategory.todo, ...todosByCategory.doing]
// completedTodos = todosByCategory.done
