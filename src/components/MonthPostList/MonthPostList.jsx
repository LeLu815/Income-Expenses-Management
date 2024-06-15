import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  FORM_CATEGORY,
  FORM_DATE,
  FORM_DESCRIPTION,
  FORM_PRICE,
} from "../../constant/constant";
import { StCardStyleDiv, StCardStyleDivPost } from "../../styles/cardLayout";
import { priceToKor } from "../../util/calculation";

function MonthPostList({ selectedMonthPosts }) {
  return (
    <StCardStyleDiv>
      <StUl>
        {(!selectedMonthPosts || selectedMonthPosts.length === 0) && (
          <div className="flex justify-center font-normal text-xl text-gray-300 py-[20px]">
            기록된 지출이 없습니다.
          </div>
        )}
        {selectedMonthPosts.map((post) => (
          <Link key={post.id} to={`/expense/${post.id}`}>
            <StCardStyleDivPost>
              <StListInfo>
                <StListDate>{post[FORM_DATE]}</StListDate>
                <StTitleContainer>
                  <StListTitle>{`${post[FORM_CATEGORY]} - `}</StListTitle>
                  <StListSubTitle>{post[FORM_DESCRIPTION]}</StListSubTitle>
                </StTitleContainer>
              </StListInfo>
              <StPrice>{priceToKor(post[FORM_PRICE])}</StPrice>
            </StCardStyleDivPost>
          </Link>
        ))}
      </StUl>
    </StCardStyleDiv>
  );
}

export default MonthPostList;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StListInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StListDate = styled.span`
  margin-bottom: 5px;
  color: rgb(102, 102, 102);
  font-size: 14px;
`;
const StTitleContainer = styled.div`
  display: flex;
`;
const StListTitle = styled.span`
  font-weight: bold;
  color: rgb(0, 123, 255);
  flex-shrink: 0;
`;
const StListSubTitle = styled.span`
  font-weight: bold;
  color: rgb(0, 123, 255);
  flex-shrink: 0;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StPrice = styled.div`
  font-weight: bold;
  color: rgb(0, 123, 255);
  flex-shrink: 0;
`;
