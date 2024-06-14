import { redirect, useNavigate, useParams } from "react-router";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { todosApi } from "../../api/api";
import {
  FORM_CATEGORY,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_PRICE,
  POST_ID,
} from "../../constant/constant";
import useFormCustom from "../../hooks/useFormCustom";
import { StCardStyleDiv } from "../../styles/cardLayout";
import {
  StButton,
  StForm,
  StInput,
  StInputSection,
  StLabel,
  StMessageSpan,
} from "../../styles/formLayout";
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
  const params = useParams();
  const paramsId = params[POST_ID];
  const [currentPost, setCurrentPost] = useState(initialValue);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: [QUERY_POSTS],
    queryFn: () => todosApi.todos.getTodos(),
  });

  const { isLoading: postsPatchLoading, mutate: pathMutate } = useMutation({
    mutationFn: (variables) => todosApi.todos.patchTodos(variables),
    onSuccess: () => {
      alert("성공했어!");
      queryClient.invalidateQueries([QUERY_POSTS]);
    },
    onError: () => {
      alert("실패했어");
    },
  });
  const { isLoading: postsDeleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: (variables) => todosApi.todos.deleteTodos(variables),
    onSuccess: () => {
      alert("성공했어!");
      queryClient.invalidateQueries([QUERY_POSTS]);
      return navigate("/");
    },
    onError: () => {
      alert("실패했어");
    },
  });

  const setPost = (changedPost) => {
    console.log(changedPost);
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
    if (!confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      return;
    }
    deleteMutate(paramsId);
  };

  useEffect(() => {
    if (data) {
      const currentPost = data.data.find((post) => post.id === paramsId);
      setCurrentPost(currentPost);
    }
  }, [data]);
  useEffect(() => {
    if (postsError) {
      alert("삭제된 기록입니다.");
      return navigate("/");
    }
  }, [postsError]);

  return (
    <StCardStyleDiv>
      <StFormHome $isInHome={false} ref={formRef} onSubmit={handleSubmit}>
        <StInputSection>
          <StLabel htmlFor={FORM_DATE}>날짜</StLabel>
          <StInput
            type="date"
            name={FORM_DATE}
            id={FORM_DATE}
            min="2022-01-01"
            defaultValue={currentPost[FORM_DATE]}
            required
          />
          <StMessageSpan>{message[FORM_DATE]}</StMessageSpan>
        </StInputSection>

        <StInputSection>
          <StLabel htmlFor={FORM_CATEGORY}>항목</StLabel>
          <StInput
            type="text"
            name={FORM_CATEGORY}
            id={FORM_CATEGORY}
            defaultValue={currentPost[FORM_CATEGORY]}
            required
          />
          <StMessageSpan>{message[FORM_CATEGORY]}</StMessageSpan>
        </StInputSection>

        <StInputSection>
          <StLabel htmlFor={FORM_PRICE}>금액</StLabel>
          <StInput
            type="number"
            name={FORM_PRICE}
            id={FORM_PRICE}
            defaultValue={currentPost[FORM_PRICE]}
            required
          />
          <StMessageSpan>{message[FORM_PRICE]}</StMessageSpan>
        </StInputSection>

        <StInputSection>
          <StLabel htmlFor={FORM_DESCRIPTION}>내용</StLabel>
          <StInput
            type="text"
            name={FORM_DESCRIPTION}
            id={FORM_DESCRIPTION}
            defaultValue={currentPost[FORM_DESCRIPTION]}
            required
          />
          <StMessageSpan>{message[FORM_DESCRIPTION]}</StMessageSpan>
        </StInputSection>

        <StButton type="submit">저장</StButton>
        <StButton type="button" onClick={handleDelete}>
          삭제
        </StButton>
        <StButton
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </StButton>
      </StFormHome>
    </StCardStyleDiv>
  );
}

export default Detail;

const StFormHome = styled(StForm)`
  flex-direction: ${(props) => (props.$isInHome ? "row" : "column")};
`;

export const loader = ({ params }) => {
  if (!params || params === "") {
    alert("삭제된 기록입니다.");
    return redirect("/");
  }
  return null;
};
