import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";

import { useNavigate } from "react-router";
import api from "../../../api/api";
import defaultImage from "../../../assets/clickImage.png";
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  useCustomToast,
} from "../../../context/toast.context";
import useFormCustom from "../../../hooks/useFormCustom";
import { userDataSchema } from "../../../util/authSchema";
import { QUERY_USER } from "../../../util/constant";

function PatchUserForm() {
  const { openToast } = useCustomToast();
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
      openToast({
        type: TOAST_TYPE_SUCCESS,
        title: "프로필이 업데이트 되었습니다 :)",
      });
      queryClient.invalidateQueries([QUERY_USER]);
    },
    onError: () => {
      openToast({
        type: TOAST_TYPE_ERROR,
        title: "프로필 업데이트를 다시 시도해주세요 :(",
      });
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center justify-center p-10 min-w-[800px] min-h-96 bg-gray-100 rounded-xl overflow-y-auto"
    >
      <h1 className="font-bold text-3xl text-gray-500 pb-[30px]">
        프로필 수정
      </h1>
      <div className="flex flex-col gap-8">
        <div>
          <label
            className="cursor-pointer relative flex justify-center items-center"
            htmlFor={id}
          >
            <img
              className="bg-white w-64 h-64 rounded-full object-cover"
              src={temperUrl}
              alt="유저 이미지"
            />
            {temperUrl === defaultImage ? (
              <span className="absolute -top-15 font-semibold text-rose-400 text-sm">
                이미지를 선택해주세요!
              </span>
            ) : (
              <span className="absolute -top-15 font-semibold text-lime-600 text-sm">
                이미지 선택 완료 :)
              </span>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="avatar"
            id={id}
            onChange={(e) => imageUpload(e)}
          />
        </div>

        <div className="flex gap-2 relative items-center">
          <label className="text-gray-500 font-bold text-lg" htmlFor="nickname">
            닉네임
          </label>
          <input
            className="p-2 rounded w-72"
            type="text"
            name="nickname"
            id="nickname"
            defaultValue={userData && userData.data.nickname}
          />
          {message && message["nickname"] && (
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message["nickname"]}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="contained" type="sumbit">
          프로필 업데이트
        </Button>
        <Button
          color="error"
          variant="contained"
          type="button"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </Button>
      </div>
    </form>
  );
}

export default PatchUserForm;
