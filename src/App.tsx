import React from "react";
import { useAtom } from "jotai";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themeAtom } from "./atoms/themeAtom";
import ToDoList from "./components/ToDoList";

function App() {
  const [theme] = useAtom(themeAtom);

  return (
    <>
      <GlobalStyle theme={theme} />
      <ToDoList />
    </>
  );
}

export default App;
