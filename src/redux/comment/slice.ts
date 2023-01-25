import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCard } from "redux/card";
import { CommentEdit, CommentsAdd, CommentsState } from "redux/comment";
import { MOCK_COMMENTS } from "store";
import { v4 as uuidv4 } from "uuid";

const initialState: CommentsState = {
  comments: MOCK_COMMENTS,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<CommentsAdd>) {
      const copyComments = { ...state.comments };
      const commentId = uuidv4();
      const { id, username, newCommentCard } = payload;
      const newComments = {
        commentId: commentId,
        cardId: id,
        author: username,
        content: newCommentCard,
      };
      copyComments[commentId] = newComments;
      state.comments = copyComments;
    },
    changeComment(state, { payload }: PayloadAction<CommentEdit>) {
      const copyComments = { ...state.comments };
      copyComments[payload.commentId].content = payload.textComment;
      state.comments = copyComments;
    },
    deleteComment(state, { payload }: PayloadAction<string>) {
      const copyComments = { ...state.comments };
      delete copyComments[payload];
      state.comments = copyComments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCard, (state, { payload }) => {
      const copyComments = { ...state.comments };

      Object.values(copyComments).forEach((comment) => {
        if (comment.cardId === payload) {
          delete copyComments[comment.commentId];
        }
      });
      state.comments = copyComments;
    });
  },
});

export const { addComment, changeComment, deleteComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
