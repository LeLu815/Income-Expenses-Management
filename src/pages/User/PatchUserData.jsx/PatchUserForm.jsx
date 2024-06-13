import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";

import api from "../../../api/api";
import defaultImage from "../../../assets/defaultImage.jpeg";
import useFormCustom from "../../../hooks/useFormCustom";
import { userDataSchema } from "../../../util/authSchema";
import { QUERY_USER } from "../../../util/constant";

function PatchUserForm() {
  const [temperUrl, setTemperUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const queryClient = useQueryClient();
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: [QUERY_USER],
    queryFn: () => api.auth.getUserInfo(),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_USER]);
    },
    onError: () => {},
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (variables) => api.auth.patchUserInfo(variables),
    onSuccess: () => {
      alert("성공했어!");
      queryClient.invalidateQueries([QUERY_USER]);
    },
    onError: () => {
      alert("실패했어");
    },
  });
  const id = useId();
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
    setImageFile(file);
    setTemperUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    setTemperUrl(userData?.data.avatar ? userData.data.avatar : defaultImage);
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor={id}>
        <img src={temperUrl} alt="유저 이미지" />
      </label>
      <input type="file" name="" id={id} onChange={(e) => imageUpload(e)} />
      <input type="text" name="avatar" />
      <input
        type="text"
        name="nickname"
        defaultValue={userData && userData.data.nickname}
      />
      <button>제출</button>
    </form>
  );
}

export default PatchUserForm;
