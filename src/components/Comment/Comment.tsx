import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CheckDelete } from "components/CheckDelete";
import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentInterface } from "redux/comment";
import { changeComment, deleteComment } from "redux/comment";
import { useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { Button, Textarea } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

type PropsComment = {
  comment: CommentInterface;
};

type CommentFormValues = {
  textComment: string;
};

export const Comment: FC<PropsComment> = ({ comment }) => {
  const [isCommentEditEnable, setIsCommentEditEnable] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { commentId } = comment;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      textComment: comment.content,
    },
  });

  const handleClickDeleteComment = () => {
    dispatch(deleteComment(commentId));
  };

  const handleClickCancelDeleteComment = () => {
    setIsConfirmDeleteVisible(false);
  };

  const handleClickCancelCommentEdit = () => {
    setIsCommentEditEnable(false);
    reset();
  };

  const onSubmitComment: SubmitHandler<CommentFormValues> = ({
    textComment,
  }: CommentFormValues) => {
    dispatch(changeComment({ commentId, textComment }));
    setIsCommentEditEnable(false);
  };

  return (
    <Root>
      <AuthorComment>{comment.author}</AuthorComment>

      {isCommentEditEnable ? (
        <form onSubmit={handleSubmit(onSubmitComment)}>
          <Textarea
            register={register("textComment", {
              validate: checkStringIsEmpty,
            })}
          />
          {errors.textComment && (
            <ErrorMessage message={errors.textComment.message} />
          )}
          <WrapButton>
            <ButtonCommentClick text="Save" type="submit" />
            <ButtonCommentClick
              text="Cancel"
              onClick={handleClickCancelCommentEdit}
            />
          </WrapButton>
        </form>
      ) : (
        <>
          <TextComment>{comment.content}</TextComment>
          <WrapButton>
            <ButtonCommentClick
              text="Edit"
              onClick={() => setIsCommentEditEnable(true)}
            />
            <ButtonCommentClick
              text="Delete"
              onClick={() => setIsConfirmDeleteVisible(true)}
            />
          </WrapButton>
        </>
      )}

      {isConfirmDeleteVisible && (
        <CheckDelete
          question="Do you really want to delete the comment?"
          onClickDelete={handleClickDeleteComment}
          onClickCancel={handleClickCancelDeleteComment}
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
  overflow-wrap: break-word;
`;

const TextComment = styled.p`
  padding: 5px 20px;
  margin-bottom: 5px;
  color: ${COLORS.black};
  background-color: ${COLORS.white_smoke};
  border-radius: 5px;
  overflow-wrap: break-word;
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

const WrapButton = styled.div`
  font-size: 14px;
  display: flex;
  column-gap: 20px;
`;
