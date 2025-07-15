import { useForm } from "react-hook-form";

interface IForm {
  email: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onValid = (data: IForm) => {
    console.log(data);
  };

  console.log(isValid);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@naver\.com$/,
              message: "@naver.com으로 끝나는 이메일을 입력해주세요.",
            },
          })}
          type="email"
          placeholder="naver.com 이메일을 입력하세요."
        />
        <button disabled={!isValid}>추가</button>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </form>
    </div>
  );
}

export default ToDoList;
