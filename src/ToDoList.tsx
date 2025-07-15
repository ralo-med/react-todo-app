import { useForm } from "react-hook-form";

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(isValid);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo")}
          // register함수가 반환하는 객체를 가져다가 input에 props로 준다
          type="text"
          placeholder="할 일을 입력하세요."
        />
        <button>추가</button>
      </form>
    </div>
  );
}

export default ToDoList;
