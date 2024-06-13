import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import styled from "styled-components";
import {
  FORM_CATEGORY,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_PRICE,
  POST_ID,
} from "../../constant/constant";
import useFormCustom from "../../hooks/useFormCustom";
import {
  delete_action,
  update_action,
} from "../../redux/reducers/post.reducer";
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

const resolver = (formData) => {
  const { success, error } = postSchema.safeParse(formData);
  return success ? {} : error.flatten().fieldErrors;
};

function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const paramsId = params[POST_ID];
  const posts = useSelector((state) => state.post);
  const setPost = (changedPost) => {
    dispatch({
      type: update_action,
      payload: {
        paramsId: paramsId,
        changedPost: changedPost,
      },
    });
  };
  const { handleSubmit, formRef, message } = useFormCustom({
    resolver,
    onSubmit: setPost,
  });
  const navigate = useNavigate();

  if (!POST_ID) {
    return (
      <div>
        <h1>삭제된 지출 내역입니다!.</h1>
        <Link to="/">
          <button>홈으로 이동</button>
        </Link>
      </div>
    );
  }
  const currentPost = posts.find((post) => post.id === paramsId);

  const handleDelete = () => {
    if (!confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      return;
    }
    dispatch({
      type: delete_action,
      payload: paramsId,
    });
    navigate("/");
  };

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
