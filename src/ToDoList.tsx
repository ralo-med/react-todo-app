import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

// Custom validation functions
const validatePasswordLength = (password: string) => {
  if (password.length < 6) {
    return "비밀번호는 6자 이상이어야 합니다.";
    //문자열 반환은 error다
  }
  return true;
};

function ToDoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      email: "@naver.com",
      password: "",
    },
  });

  const onValid = (data: IForm) => {
    console.log(data);

    // 예시: 서버 응답에 따라 에러 설정
    if (data.email === "test@naver.com") {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    // 예시: 비밀번호 확인 로직
    if (data.password === "123456") {
      setError("password", {
        type: "manual",
        message: "너무 간단한 비밀번호입니다.",
      });
    }
  };

  console.log(isValid);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
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
            autoComplete="email"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              validate: validatePasswordLength,
            })}
            type="password"
            placeholder="비밀번호를 입력하세요."
            autoComplete="current-password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button disabled={!isValid}>추가</button>
      </form>
    </div>
  );
}

export default ToDoList;
