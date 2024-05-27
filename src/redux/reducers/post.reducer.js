import { v4 as uuidv4 } from "uuid";

export const add_action = "post/ADD";
export const delete_action = "post/DELETE";
export const update_action = "post/UPDATE";

const initalState = [];

function postReducer(prevState = initalState, action) {
  switch (action.type) {
    case add_action:
      return [...prevState, { ...action.payload, id: uuidv4() }];

    case delete_action:
      if (prevState.length == 0) {
        return [];
      }
      return prevState.filter((post) => post.id !== action.payload);

    case update_action:
      if (prevState.length == 0) {
        return [];
      }
      return prevState.map((post) => {
        if (post.id === action.payload.paramsId) {
          return { ...post, ...action.payload.changedPost };
        }
        return post;
      });

    default:
      return prevState;
  }
}

export default postReducer;
