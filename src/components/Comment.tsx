import React, { FC, useState } from "react";

import styled from "styled-components";
import { Button, Textarea } from "ui";

import { COLORS } from "../constants/COLORS";

type PropsComment = {
  commentItem: {
    commentId: string;
    cardId: string;
    author: string;
    comment: string;
  };
  deleteComments: (commentId: string) => void;
  changeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Comment: FC<PropsComment> = ({
  commentItem,
  deleteComments,
  changeTextComment,
}) => {
  const [textComment, setTextComment] = useState(commentItem.comment);
  const [textNewComment, setTextNewComment] = useState(textComment);
  const [edit, setEdit] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handelClickDeleteComment = () => {
    deleteComments(commentItem.commentId);
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextNewComment(event.target.value);
  };

  const handleClickEditSave = () => {
    setEdit(false);
    setTextComment(textNewComment);
    changeTextComment(commentItem.commentId, textNewComment);
  };

  const handleClickEditCancel = () => {
    setEdit(false);
    setTextNewComment(textComment);
  };

  return (
    <Root>
      <AuthorComment>{commentItem.author}</AuthorComment>
      {!edit ? (
        <>
          <TextComment>{textComment}</TextComment>
          <FlexBlock>
            <CommentClick onClick={() => setEdit(true)}>Edit</CommentClick>
            <CommentClick onClick={() => setCheckDelete(true)}>
              Delete
            </CommentClick>
          </FlexBlock>
        </>
      ) : (
        <>
          <StyledTextArea
            value={textNewComment}
            onChange={handleChangeComment}
          />
          <FlexBlock>
            <CommentClick onClick={() => handleClickEditSave()}>
              Save
            </CommentClick>
            <CommentClick onClick={() => handleClickEditCancel()}>
              Cancel
            </CommentClick>
          </FlexBlock>
        </>
      )}
      {checkDelete && (
        <CheckDeleteBlock>
          <TitleCheckDelete>
            Do you really want to delete the comment?
          </TitleCheckDelete>
          <WrapButton>
            <StyledButton
              text="Yes"
              onClick={() => handelClickDeleteComment()}
            />
            <StyledButton text="Cancel" onClick={() => setCheckDelete(false)} />
          </WrapButton>
        </CheckDeleteBlock>
      )}
    </Root>
  );
};

const Root = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const AuthorComment = styled.p`
  margin-bottom: 5px;
`;

const TextComment = styled.p`
  padding: 5px 20px;
  margin-bottom: 5px;
  color: ${COLORS.black};
  background-color: ${COLORS.white_smoke};
  border-radius: 5px;
`;

const CommentClick = styled.div`
  color: ${COLORS.gray};
  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${COLORS.black};
  }
`;

const FlexBlock = styled.div`
  font-size: 14px;
  display: flex;
  column-gap: 20px;
`;

const CheckDeleteBlock = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  padding: 20px 30px;
  background-color: ${COLORS.gray};
  border-radius: 15px;
  box-shadow: 0 0 25px ${COLORS.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleCheckDelete = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const StyledButton = styled(Button)``;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;

const StyledTextArea = styled(Textarea)``;
