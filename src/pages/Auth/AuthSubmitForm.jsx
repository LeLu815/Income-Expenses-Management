import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import api from "../../api/api";
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  useCustomToast,
} from "../../context/toast.context";
import useFormCustom from "../../hooks/useFormCustom";
import { joinSchema, loginSchema } from "../../util/authSchema";
import { ACCESS_TOKEN, QUERY_USER } from "../../util/constant";
import { setDataToSession } from "../../util/storageFunc";

function AuthSubmitForm({ type }) {
  const { openToast } = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      setDataToSession(ACCESS_TOKEN, variables.data.accessToken);
      openToast({
        type: TOAST_TYPE_SUCCESS,
        title: "로그인 되었습니다. 감사합니다 :)",
      });
      if (type === "login") {
        queryClient.invalidateQueries([QUERY_USER]);
      }
      return navigate("/");
    },
    onError: () => {
      openToast({
        type: TOAST_TYPE_ERROR,
        title: "입력하신 정보를 다시 확인해주세요 :(",
      });
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center justify-center p-10 min-w-[800px] min-h-96 bg-gray-100 rounded-xl overflow-y-auto"
    >
      <h1 className="font-bold text-3xl text-gray-500">
        {type === "join" ? "회원가입" : "로그인"}
      </h1>
      <div className="flex flex-col gap-8 items-end">
        <div className="flex gap-2 relative items-center">
          <label className="text-gray-500 font-bold text-lg" htmlFor="id">
            아이디
          </label>
          <input
            className="p-2 rounded w-72"
            name="id"
            type="text"
            placeholder="id"
          />
          {message && message["id"] && (
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message["id"]}
            </span>
          )}
        </div>

        <div className="flex gap-2 relative items-center">
          <label className="text-gray-500 font-bold text-lg" htmlFor="password">
            비밀번호
          </label>
          <input
            className="p-2 rounded w-72"
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />
          {message && message["password"] && (
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message["password"]}
            </span>
          )}
        </div>

        {type === "join" && (
          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor="password2"
            >
              비밀번호 확인
            </label>
            <input
              id="password2"
              className="p-2 rounded w-72"
              name="password2"
              type="password"
              placeholder="password2"
            />
            {message && message["password2"] && (
              <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
                {message["password2"]}
              </span>
            )}
          </div>
        )}

        {type === "join" && (
          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              id="nickname"
              className="p-2 rounded w-72"
              name="nickname"
              type="text"
              placeholder="nickname"
            />
            {message && message["nickname"] && (
              <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
                {message["nickname"]}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="contained" className="" type="submit">
          <div>{type === "join" ? "가입하기" : "로그인하기"}</div>
        </Button>
        {type === "join" ? (
          <Link to="/login">로그인하기 &rarr;</Link>
        ) : (
          <Link to="/join">회원가입 &rarr;</Link>
        )}
      </div>
    </form>
  );
}

export default AuthSubmitForm;
