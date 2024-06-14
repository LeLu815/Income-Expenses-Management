import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";

import { useNavigate } from "react-router";
import api from "../../../api/api";
import defaultImage from "../../../assets/clickImage.png";
import useFormCustom from "../../../hooks/useFormCustom";
import { userDataSchema } from "../../../util/authSchema";
import { QUERY_USER } from "../../../util/constant";

function PatchUserForm() {
  const navigate = useNavigate();
  const [temperUrl, setTemperUrl] = useState(defaultImage);
  const queryClient = useQueryClient();
  const id = useId();

  // 유저 데이터 get 쿼리
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: [QUERY_USER],
    queryFn: () => api.auth.getUserInfo(),
  });

  // 유저 데이터 업로드 쿼리
  const { isLoading: userDatauploadLoading, mutate } = useMutation({
    mutationFn: (variables) => api.auth.patchUserInfo(variables),
    onSuccess: () => {
      alert("성공했어!");
      queryClient.invalidateQueries([QUERY_USER]);
    },
    onError: () => {
      alert("실패했어");
    },
  });

  const onSubmitFunc = (userFormData) => {
    mutate(userFormData);
  };
  const resolver = (formValues) => {
    const { success, error } = userDataSchema.safeParse(formValues);
    return success ? {} : error.flatten().fieldErrors;
  };
  const { handleSubmit, formRef, message } = useFormCustom({
    resolver,
    onSubmit: onSubmitFunc,
  });

  const imageUpload = (e) => {
    const file = e.target.files[0];
    setTemperUrl(URL.createObjectURL(file));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor={id}>
        <img src={temperUrl} alt="유저 이미지" />
      </label>
      <input
        type="file"
        name="avatar"
        id={id}
        onChange={(e) => imageUpload(e)}
      />
      <input
        type="text"
        name="nickname"
        defaultValue={userData && userData.data.nickname}
      />
      <button type="sumbit">제출</button>
    </form>
  );
}

export default PatchUserForm;
