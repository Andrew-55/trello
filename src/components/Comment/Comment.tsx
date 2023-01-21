import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CheckDelete } from "components/CheckDelete";
import { CommentInterface } from "interfaces";
import styled from "styled-components";
import { Button, Textarea } from "ui";

type PropsComment = {
  comment: CommentInterface;
  onDeleteComments: (commentId: string) => void;
  onChangeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Comment: FC<PropsComment> = ({
  comment,
  onDeleteComments,
  onChangeTextComment,
}) => {
  const [textComment, setTextComment] = useState(comment.content);
  const [isCommentEditEnable, setIsCommentEditEnable] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const handelClickDeleteComment = () => {
    onDeleteComments(comment.commentId);
  };

  const handelClickCancelDeleteComment = () => {
    setIsConfirmDeleteVisible(false);
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextComment(event.target.value);
  };

  const handleClickEditSave = () => {
    setIsCommentEditEnable(false);
    onChangeTextComment(comment.commentId, textComment);
  };

  const handleClickEditCancel = () => {
    setIsCommentEditEnable(false);
    setTextComment(comment.content);
  };

  return (
    <Root>
      <AuthorComment>{comment.author}</AuthorComment>

      {isCommentEditEnable ? (
        <>
          <Textarea value={textComment} onChange={handleChangeComment} />
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
              onClick={() => setIsCommentEditEnable(true)}
            />
            <ButtonCommentClick
              text="Delete"
              onClick={() => setIsConfirmDeleteVisible(true)}
            />
          </FlexBlock>
        </>
      )}

      {isConfirmDeleteVisible && (
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
