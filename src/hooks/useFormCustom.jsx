import { useRef, useState } from "react";

function useFormCustom({ resolver, onSubmit }) {
  const formRef = useRef(null);
  const [message, setMessage] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formDataObj = Object.fromEntries(formData.entries());
    let errors = {};

    // 리졸버로 폼 데이터들의 유효성을 검사
    if (resolver) {
      errors = resolver(formDataObj);
    }
    // 에러가 하나라도 있으면 제출을 막는 return
    if (Object.keys(errors).length !== 0) {
      setMessage(errors);
      return;
    }
    // 에러가 없으면 서브밋 함수 제출
    onSubmit(formDataObj);
    // 폼 초기화
    formRef.current.reset();
    setMessage({});
  };
  return {
    handleSubmit,
    formRef,
    message,
  };
}

export default useFormCustom;
