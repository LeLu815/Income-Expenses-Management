import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { QUERY_POSTS } from "../../util/constant";

import { todosApi } from "../../api/api";
import {
  FORM_CATEGORY,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_PRICE,
} from "../../constant/constant";
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  useCustomToast,
} from "../../context/toast.context";
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
import { postSchema } from "../../util/postSchema";

const resolver = (formValues) => {
  const { success, error } = postSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
const inputDefaultDate = new Date();

function SubmitForm({ isInHome, selectedMonth }) {
  const { openToast } = useCustomToast();
  const queryClient = useQueryClient();
  const { isLoading: postsUpdateLoading, mutate } = useMutation({
    mutationFn: (variable) => todosApi.todos.postTodos(variable),
    onSuccess: () => {
      openToast({
        type: TOAST_TYPE_SUCCESS,
        title: "새로운 지출내역이 생성되었습니다. :)",
      });
      queryClient.invalidateQueries([QUERY_POSTS]);
    },
    onError: (e) => {
      openToast({
        type: TOAST_TYPE_ERROR,
        title: "다시 한번 시도해주세요 :(",
      });
    },
  });

  const defaultDate = `${inputDefaultDate.getFullYear()}-${
    parseInt(selectedMonth) + 1 <= 9
      ? "0" + (parseInt(selectedMonth) + 1)
      : parseInt(selectedMonth) + 1
  }-01`;
  const addNewPost = (newPostObj) => {
    mutate(newPostObj);
  };
  // form의 각각의 input에 대한 state를 만들지 않음으로써 불필요한 랜더링을 줄일 수 있다.
  // 각 인풋에 대한 유효성을 각각 별도로 유지관리하는 것이 아니라 resolver 를 넘겨줌으로써 다양한 인풋 형식에 대해서 유연하게 대응할 수 있다.
  const { handleSubmit, formRef, message } = useFormCustom({
    resolver,
    onSubmit: addNewPost,
  });

  return (
    <StCardStyleDiv>
      <StFormHome $isInHome={isInHome} ref={formRef} onSubmit={handleSubmit}>
        <StInputSection>
          <StLabel htmlFor={FORM_DATE}>날짜</StLabel>
          <StInput
            key={selectedMonth}
            type="date"
            name={FORM_DATE}
            id={FORM_DATE}
            min="2022-01-01"
            defaultValue={defaultDate}
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
            required
          />
          <StMessageSpan>{message[FORM_CATEGORY]}</StMessageSpan>
        </StInputSection>

        <StInputSection>
          <StLabel htmlFor={FORM_PRICE}>금액</StLabel>
          <StInput type="number" name={FORM_PRICE} id={FORM_PRICE} required />
          <StMessageSpan>{message[FORM_PRICE]}</StMessageSpan>
        </StInputSection>

        <StInputSection>
          <StLabel htmlFor={FORM_DESCRIPTION}>내용</StLabel>
          <StInput
            type="text"
            name={FORM_DESCRIPTION}
            id={FORM_DESCRIPTION}
            required
          />
          <StMessageSpan>{message[FORM_DESCRIPTION]}</StMessageSpan>
        </StInputSection>

        <StButton disabled={postsUpdateLoading} type="submit">
          저장
        </StButton>
      </StFormHome>
    </StCardStyleDiv>
  );
}

export default SubmitForm;

const StFormHome = styled(StForm)`
  flex-direction: ${(props) => (props.$isInHome ? "row" : "column")};
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`;
