import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { addTodoAtom } from "../atoms/todoAtom";

interface IForm {
  todo: string;
}

function CreateToDo() {
  const addTodo = useSetAtom(addTodoAtom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      todo: "",
    },
  });

  const onValid = (data: IForm) => {
    addTodo(data.todo);
    reset(); // 폼 초기화
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div style={{ marginBottom: "20px" }}>
        <input
          {...register("todo", {
            required: "할일을 입력해주세요.",
            minLength: {
              value: 2,
              message: "할일은 2자 이상 입력해주세요.",
            },
          })}
          type="text"
          placeholder="할일을 입력하세요."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        {errors.todo && (
          <p style={{ color: "red", margin: "5px 0" }}>{errors.todo.message}</p>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        할일 추가
      </button>
    </form>
  );
}

export default CreateToDo;
