import { Link } from "react-router-dom";

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
      {selectedMonthPosts.map((post) => (
        <Link key={post.id} to={`/expense/${post.id}`}>
          <StCardStyleDivPost>
            <div>
              <span>{post[FORM_DATE]}</span>
              <div>
                <span>{`${post[FORM_CATEGORY]} - `}</span>
                <span>{post[FORM_DESCRIPTION]}</span>
              </div>
            </div>
            <div>{priceToKor(post[FORM_PRICE])}</div>
          </StCardStyleDivPost>
        </Link>
      ))}
    </StCardStyleDiv>
  );
}

export default MonthPostList;
