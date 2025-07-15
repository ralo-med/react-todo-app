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
