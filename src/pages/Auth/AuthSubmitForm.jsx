import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import api from "../../api/api";
import useFormCustom from "../../hooks/useFormCustom";
import { joinSchema, loginSchema } from "../../util/authSchema";
import { setDataToSession } from "../../util/storageFunc";

function AuthSubmitForm({ type }) {
  const navigete = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: (variables) => {
      if (type === "login") {
        return api.auth.login(variables);
      }
      if (type === "join") {
        return api.auth.join(variables);
      }
    },
    onSuccess: (variables) => {
      setDataToSession("accessToken", variables.data.accessToken);
      alert("성공했어!");
      if (type === "join") {
        return navigete("/login");
      }
      if (type === "login") {
        return navigete("/");
      }
    },
    onError: () => {
      alert("실패했어");
    },
  });

  let authSchema;
  switch (type) {
    case "login":
      authSchema = loginSchema;
      break;
    case "join":
      authSchema = joinSchema;
      break;
    default:
      authSchema = loginSchema;
  }
  const resolver = (formValues) => {
    const { success, error } = authSchema.safeParse(formValues);
    return success ? {} : error.flatten().fieldErrors;
  };
  const handleSumbit = (newPostObj) => {
    mutate(newPostObj);
  };
  const { handleSubmit, formRef, message } = useFormCustom({
    resolver,
    onSubmit: handleSumbit,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="id" type="text" placeholder="id" />
      <input name="password" type="password" placeholder="password" />
      {type === "join" && (
        <input name="password2" type="password" placeholder="password2" />
      )}
      {type === "join" && (
        <input name="nickname" type="text" placeholder="nickname" />
      )}
      <button type="submit">제출</button>
    </form>
  );
}

export default AuthSubmitForm;
