import { COLORS, Z_INDEX } from "constants/";

import React, { FC, useEffect, useState } from "react";

import { Comment, Description } from "components";
import { CardInterface } from "interfaces";
import { changeNameCard, changeDescriptionCard } from "redux/card";
import { selectorColumnNameByColumnId } from "redux/column";
import { addComment, selectorCommentsByCardId } from "redux/comment";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { selectorUsername } from "redux/user";
import styled from "styled-components";
import { SvgCheckMark, SvgClose, SvgPencil } from "svg";
import { Button, ButtonIcon, Input, Textarea } from "ui";

type Props = {
  card: CardInterface;
  onActiveCardModel: () => void;
};

export const CardModal: FC<Props> = ({ onActiveCardModel, card }) => {
  const commentsCard = useAppSelector(selectorCommentsByCardId(card.id));
  const username = useAppSelector(selectorUsername);
  const columnName = useAppSelector(
    selectorColumnNameByColumnId(card.columnId)
  );

  const [titleCard, setTitleCard] = useState(card.title);
  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);
  const [newCommentCard, setNewCommentCard] = useState("");

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

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleCard(event.target.value);
  };

  const handleChangeNewComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCommentCard(event.target.value);
  };

  const handelClickSaveTitleCard = () => {
    dispatch(changeNameCard({ id, titleCard }));
    setIsTitleCardEditEnable(false);
  };

  const handelClickSaveNewComment = () => {
    if (newCommentCard.trim().length) {
      dispatch(addComment({ id, username, newCommentCard }));
      setNewCommentCard("");
    }
    setNewCommentCard("");
  };

  const handelClickCanselNewComment = () => {
    setNewCommentCard("");
  };

  return (
    <Root>
      <CloseBlock onClick={onActiveCardModel} />
      <CardModalBlock>
        <NameAuthor>Create by: {card.author}</NameAuthor>
        <NameAuthor>Status: {columnName}</NameAuthor>

        {isTitleCardEditEnable ? (
          <FlexBlock>
            <StyledInput value={titleCard} onChange={handleChangeCardName} />
            <StyledButtonIcon
              icon={<SvgCheckMark />}
              onClick={handelClickSaveTitleCard}
            />
          </FlexBlock>
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
          <StyledTextArea
            value={newCommentCard}
            onChange={handleChangeNewComment}
            placeholder="Write a comment ...."
          />
          <WrapButton>
            <StyledButton text="Add" onClick={handelClickSaveNewComment} />
            <StyledButton text="Cancel" onClick={handelClickCanselNewComment} />
          </WrapButton>
          <ContainerComments>
            <ul>
              {commentsCard.map((elem) => (
                <li key={elem.commentId}>
                  <Comment comment={elem} />
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
  z-index: ${Z_INDEX.carsModal};
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

const StyledInput = styled(Input)`
  font-size: 15px;
  width: 50%;
  margin-bottom: 20px;
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
