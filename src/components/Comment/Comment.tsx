import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CheckDelete } from "components/CheckDelete";
import { CommentInterface } from "interfaces";
import styled from "styled-components";
import { Button, Textarea } from "ui";

type PropsComment = {
  commentItem: CommentInterface;
  onDeleteComments: (commentId: string) => void;
  onChangeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Comment: FC<PropsComment> = ({
  commentItem,
  onDeleteComments,
  onChangeTextComment,
}) => {
  const [textComment, setTextComment] = useState(commentItem.comment);
  const [textNewComment, setTextNewComment] = useState(textComment);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handelClickDeleteComment = () => {
    onDeleteComments(commentItem.commentId);
  };

  const handelClickCancelDeleteComment = () => {
    setCheckDelete(false);
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextNewComment(event.target.value);
  };

  const handleClickEditSave = () => {
    setCheckEdit(false);
    setTextComment(textNewComment);
    onChangeTextComment(commentItem.commentId, textNewComment);
  };

  const handleClickEditCancel = () => {
    setCheckEdit(false);
    setTextNewComment(textComment);
  };

  return (
    <Root>
      <AuthorComment>{commentItem.author}</AuthorComment>
      {checkEdit ? (
        <>
          <StyledTextArea
            value={textNewComment}
            onChange={handleChangeComment}
          />
          <FlexBlock>
            <ButtonCommentClick text="Save" onClick={handleClickEditSave} />
            <ButtonCommentClick text="Cancel" onClick={handleClickEditCancel} />
          </FlexBlock>
        </>
      ) : (
        <>
          <TextComment>{textComment}</TextComment>
          <FlexBlock>
            <ButtonCommentClick
              text="Edit"
              onClick={() => setCheckEdit(true)}
            />
            <ButtonCommentClick
              text="Delete"
              onClick={() => setCheckDelete(true)}
            />
          </FlexBlock>
        </>
      )}
      {checkDelete && (
        <CheckDelete
          question="Do you really want to delete the comment?"
          onClickDelete={handelClickDeleteComment}
          onClickCancel={handelClickCancelDeleteComment}
        />
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

const ButtonCommentClick = styled(Button)`
  color: ${COLORS.gray};
  padding: 0 10px;
  text-decoration: underline;
  background-color: initial;
  border: none;
  cursor: pointer;
  &:hover {
    border: none;
    background-color: initial;
    color: ${COLORS.black};
  }
`;

const FlexBlock = styled.div`
  font-size: 14px;
  display: flex;
  column-gap: 20px;
`;

const StyledTextArea = styled(Textarea)``;
