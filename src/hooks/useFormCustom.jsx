import { useRef, useState } from "react";

function useFormCustom({ resolver, onSubmit }) {
  const formRef = useRef(null);
  const [] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return {
    handleSubmit,
  };
}

export default useFormCustom;
