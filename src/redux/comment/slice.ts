import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockCommentsType } from "interfaces";
import { MOCK_COMMENTS } from "store";
import { v4 as uuidv4 } from "uuid";

interface CommentsState {
  comments: MockCommentsType;
}

interface CommentsAdd {
  id: string;
  username: string;
  newCommentCard: string;
}
interface CommentEdit {
  commentId: string;
  textComment: string;
}

const initialState: CommentsState = {
  comments: MOCK_COMMENTS,
};

export const commentsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<CommentsAdd>) {
      const copyComments = { ...state.comments };
      const commentId = uuidv4();
      const { id, username, newCommentCard } = action.payload;
      const newComments = {
        commentId: commentId,
        cardId: id,
        author: username,
        content: newCommentCard,
      };
      copyComments[commentId] = newComments;
      state.comments = copyComments;
    },
    changeComment(state, action: PayloadAction<CommentEdit>) {
      const copyComments = { ...state.comments };
      copyComments[action.payload.commentId].content =
        action.payload.textComment;
      state.comments = copyComments;
    },
    deleteComment(state, action: PayloadAction<string>) {
      const copyComments = { ...state.comments };
      delete copyComments[action.payload];
      state.comments = copyComments;
    },
    deleteAllCommentByCardId(state, action: PayloadAction<string>) {
      const copyComments = { ...state.comments };

      Object.values(copyComments).forEach((comment) => {
        if (comment.cardId === action.payload) {
          delete copyComments[comment.commentId];
        }
      });
      state.comments = copyComments;
    },
  },
});

export const {
  addComment,
  changeComment,
  deleteComment,
  deleteAllCommentByCardId,
} = commentsSlice.actions;
export default commentsSlice.reducer;
