import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router";
import styled from "styled-components";

import { todosApi } from "../../api/api";
import {
  FORM_CATEGORY,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_PRICE,
  POST_ID,
} from "../../constant/constant";
import { useCustomModal } from "../../context/alert.context";
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  useCustomToast,
} from "../../context/toast.context";
import useFormCustom from "../../hooks/useFormCustom";
import { StCardStyleDiv } from "../../styles/cardLayout";
import { StForm } from "../../styles/formLayout";
import { QUERY_POSTS } from "../../util/constant";
import { postSchema } from "../../util/postSchema";

const resolver = (formData) => {
  const { success, error } = postSchema.safeParse(formData);
  return success ? {} : error.flatten().fieldErrors;
};

const initialValue = {
  category: "",
  date: "",
  price: "",
  descriptionƒ: "",
};

function Detail() {
  const { openToast } = useCustomToast();
  const params = useParams();
  const paramsId = params[POST_ID];
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    openModal,
    closeModal,
    confirm: confrimModal,
    setConfirm,
  } = useCustomModal();

  const {
    data: currentPost,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: [QUERY_POSTS, { id: paramsId }],
    queryFn: () => todosApi.todos.getTodo(paramsId),
  });

  const { isLoading: postsPatchLoading, mutate: pathMutate } = useMutation({
    mutationFn: (variables) => todosApi.todos.patchTodos(variables),
    onSuccess: () => {
      openToast({
        type: TOAST_TYPE_SUCCESS,
        title: "업데이트 되었습니다. 감사합니다 :)",
      });
      queryClient.invalidateQueries([QUERY_POSTS, { id: paramsId }]);
    },
    onError: () => {
      openToast({
        type: TOAST_TYPE_ERROR,
        title: "업데이트가 실패했습니다. 다시 시도해주세요 :(",
      });
    },
  });
  const { isLoading: postsDeleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: (variables) => todosApi.todos.deleteTodos(variables),
    onSuccess: () => {
      openToast({
        type: TOAST_TYPE_SUCCESS,
        title: "삭제 되었습니다. 감사합니다 :)",
      });
      queryClient.invalidateQueries([QUERY_POSTS]);
      return navigate("/");
    },
    onError: () => {
      openToast({
        type: TOAST_TYPE_ERROR,
        title: "삭제에 실패했습니다. 다시 시도해주세요 :(",
      });
    },
  });

  const setPost = (changedPost) => {
    pathMutate({
      id: paramsId,
      newTodo: changedPost,
    });
  };
  const { handleSubmit, formRef, message } = useFormCustom({
    resolver,
    onSubmit: setPost,
  });

  const handleDelete = () => {
    openModal({
      title: "지출 항목 삭제",
      description: "정말로 이 지출 항목을 삭제하시겠습니까?",
      button: "삭제",
    });
  };
  useEffect(() => {
    if (confrimModal) {
      deleteMutate(paramsId);
    }
    setConfirm(false);
  }, [confrimModal]);

  useEffect(() => {
    if (postsError) {
      openModal({
        title: "삭제된 기록",
        description: "삭제된 기록입니다. :(",
      });
      return navigate("/");
    }
  }, [postsError]);

  return (
    <StCardStyleDiv>
      <StFormHome $isInHome={false} ref={formRef} onSubmit={handleSubmit}>
        <h1 className="font-semibold text-2xl text-gray-500 mb-10">
          지출 기록 수정
        </h1>
        <div className="mx-auto flex flex-col gap-8 items-end">
          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor={FORM_DATE}
            >
              날짜
            </label>
            <input
              className="p-2 rounded w-[350px] border-slate-300 border border-solid"
              type="date"
              name={FORM_DATE}
              id={FORM_DATE}
              min="2022-01-01"
              defaultValue={currentPost && currentPost[FORM_DATE]}
              required
            />
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message[FORM_DATE]}
            </span>
          </div>

          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor={FORM_CATEGORY}
            >
              항목
            </label>
            <input
              className="p-2 rounded w-[350px] border-slate-300 border border-solid"
              type="text"
              name={FORM_CATEGORY}
              id={FORM_CATEGORY}
              defaultValue={currentPost && currentPost[FORM_CATEGORY]}
              required
            />
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message[FORM_CATEGORY]}
            </span>
          </div>

          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor={FORM_PRICE}
            >
              금액
            </label>
            <input
              className="p-2 rounded w-[350px] border-slate-300 border border-solid"
              type="number"
              name={FORM_PRICE}
              id={FORM_PRICE}
              defaultValue={currentPost && currentPost[FORM_PRICE]}
              required
            />
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message[FORM_PRICE]}
            </span>
          </div>

          <div className="flex gap-2 relative items-center">
            <label
              className="text-gray-500 font-bold text-lg"
              htmlFor={FORM_DESCRIPTION}
            >
              내용
            </label>
            <input
              className="p-2 rounded w-[350px] border-slate-300 border border-solid"
              type="text"
              name={FORM_DESCRIPTION}
              id={FORM_DESCRIPTION}
              defaultValue={currentPost && currentPost[FORM_DESCRIPTION]}
              required
            />
            <span className="absolute top-11 -left-20 text-rose-500 w-[600px] text-center">
              {message[FORM_DESCRIPTION]}
            </span>
          </div>

          <div className="flex gap-3 justify-between items-center">
            <Button
              className="w-[100px]"
              variant="contained"
              type="submit"
              disabled={postsPatchLoading}
            >
              저장
            </Button>
            <Button
              className="w-[100px]"
              color="error"
              variant="outlined"
              type="button"
              onClick={handleDelete}
              disabled={postsDeleteLoading}
            >
              삭제
            </Button>
            <Button
              className="w-[100px]"
              variant="outlined"
              color="success"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </StFormHome>
    </StCardStyleDiv>
  );
}

export default Detail;

const StFormHome = styled(StForm)`
  flex-direction: ${(props) => (props.$isInHome ? "row" : "column")};
  padding: 25px;
`;

export const loader = ({ params }) => {
  if (!params || params === "") {
    alert("삭제된 기록입니다.");
    return redirect("/");
  }
  return null;
};
