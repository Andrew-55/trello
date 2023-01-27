import { COLORS, Z_INDEX } from "constants/";

import React, { FC, useEffect, useState } from "react";

import { Comment, Description } from "components";
import { FormCardModalGetTitleCard } from "components/CardModal";
import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardInterface } from "redux/card";
import { changeNameCard, changeDescriptionCard } from "redux/card";
import { getColumnNameByColumnId } from "redux/column";
import { addComment, getCommentsByCardId } from "redux/comment";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getUsername } from "redux/user";
import styled from "styled-components";
import { SvgClose, SvgPencil } from "svg";
import { Button, ButtonIcon, Textarea } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

type Props = {
  card: CardInterface;
  onActiveCardModel: () => void;
};

type CommentFormValues = {
  newCommentCard: string;
};

export const CardModal: FC<Props> = ({ onActiveCardModel, card }) => {
  const commentsCard = useAppSelector(getCommentsByCardId(card.id));
  const username = useAppSelector(getUsername);
  const columnName = useAppSelector(getColumnNameByColumnId(card.columnId));

  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      newCommentCard: "",
    },
  });

  const dispatch = useAppDispatch();
  const { id } = card;

  useEffect(() => {
    const handelPushEsc = (e: any) => {
      if (e.keyCode === 27) {
        onActiveCardModel();
      }
    };
    document.body.addEventListener("keydown", handelPushEsc);
    return () => document.body.removeEventListener("keydown", handelPushEsc);
  });

  const handleSaveNewDescriptionCard = (newDescription: string) => {
    dispatch(changeDescriptionCard({ id, newDescription }));
  };

  const handleGetCartNameForm = (titleCard: string) => {
    dispatch(changeNameCard({ id, titleCard }));
    setIsTitleCardEditEnable(false);
  };

  const handleCloseTitleCardEdit = () => {
    setIsTitleCardEditEnable(false);
  };

  const onSubmit: SubmitHandler<CommentFormValues> = ({
    newCommentCard,
  }: CommentFormValues) => {
    dispatch(addComment({ id, username, newCommentCard }));
    setValue("newCommentCard", "");
  };

  return (
    <Root>
      <CloseBlock onClick={onActiveCardModel} />
      <CardModalBlock>
        <NameAuthor>Create by: {card.author}</NameAuthor>
        <NameAuthor>Status: {columnName}</NameAuthor>

        {isTitleCardEditEnable ? (
          <FormCardModalGetTitleCard
            title={card.title}
            onGetCartNameForm={handleGetCartNameForm}
            onCloseTitleCardEdit={handleCloseTitleCardEdit}
          />
        ) : (
          <FlexBlock>
            <TitleBlock>{card.title}</TitleBlock>
            <StyledButtonIcon
              icon={<SvgPencil />}
              onClick={() => setIsTitleCardEditEnable(true)}
            />
          </FlexBlock>
        )}

        <StyledButtonIconClose
          icon={<SvgClose />}
          onClick={onActiveCardModel}
        />
        <Description
          description={card.description}
          onSaveNewDescriptionCard={handleSaveNewDescriptionCard}
        />
        <>
          <TitleComment>Comments</TitleComment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledTextArea
              register={register("newCommentCard", {
                validate: checkStringIsEmpty,
              })}
              placeholder="Write a comment ...."
              autoFocus
            />

            {errors.newCommentCard && (
              <ErrorMessage message={errors.newCommentCard.message} />
            )}

            <WrapButton>
              <StyledButton text="Add" type="submit" />
              <StyledButton
                text="Cancel"
                type="button"
                onClick={() => reset()}
              />
            </WrapButton>
          </form>

          <ContainerComments>
            <ul>
              {commentsCard.map((comment) => (
                <li key={comment.commentId}>
                  <Comment comment={comment} />
                </li>
              ))}
            </ul>
          </ContainerComments>
        </>
      </CardModalBlock>
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.black1};
  z-index: ${Z_INDEX.cardModal};
`;

const CloseBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const CardModalBlock = styled.div`
  position: relative;
  width: 60%;
  min-width: 500px;
  padding: 30px;
  border-radius: 5px;
  background-color: ${COLORS.zambezi};
`;

const FlexBlock = styled.div`
  display: flex;
  column-gap: 30px;
  margin-bottom: 30px;
`;

const StyledButtonIconClose = styled(ButtonIcon)`
  position: absolute;
  top: 20px;
  right: 30px;
  width: 40px;
  height: 40px;
  fill: ${COLORS.white_smoke};
  border-radius: 100%;
  &:hover {
    fill: ${COLORS.black};
    background-color: ${COLORS.gray};
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 40px;
  height: 40px;
  border-radius: 20%;
  fill: ${COLORS.white_smoke};

  &:hover {
    fill: ${COLORS.light_green};
    background-color: ${COLORS.gray};
  }
`;

const StyledTextArea = styled(Textarea)`
  margin-left: 20px;
  width: 95%;
  margin-bottom: 10px;
`;

const TitleBlock = styled.h1`
  color: ${COLORS.white_smoke};
  font-size: 32px;
  text-transform: uppercase;
  word-break: break-word;
`;

const TitleComment = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const ContainerComments = styled.div`
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
`;

const NameAuthor = styled.p`
  max-width: 90%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
`;
