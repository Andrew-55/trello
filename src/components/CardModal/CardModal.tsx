import { COLORS, Z_INDEX } from "constants/";

import React, { FC, useState } from "react";

import { Comment, Description } from "components";
import { CardInterface, CommentInterface } from "interfaces";
import styled from "styled-components";
import { SvgCheckMark, SvgClose, SvgPencil } from "svg";
import { Button, ButtonIcon, Input, Textarea } from "ui";

type Props = {
  itemCard: CardInterface;
  commentsCard: CommentInterface[];
  columnName: string;
  onActiveCardModel: () => void;
  onSaveNewDescriptionCard: (cardId: string, newDescription: string) => void;
  onClickSaveTitleCardModal: (newTitleCard: string) => void;
  onAddNewComments: (cardId: string, comment: string) => void;
  onDeleteComments: (commentId: string) => void;
  onChangeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const CardModal: FC<Props> = ({
  onActiveCardModel,
  itemCard,
  commentsCard,
  columnName,
  onSaveNewDescriptionCard,
  onClickSaveTitleCardModal,
  onAddNewComments,
  onDeleteComments,
  onChangeTextComment,
}) => {
  const [titleCard, setTitleCard] = useState(itemCard.title);
  const [newTitleCard, setNewTitleCard] = useState(titleCard);
  const [checkEditTitleCard, setCheckEditTitleCard] = useState(false);
  const [newCommentCard, setNewCommentCard] = useState("");

  const handleSaveNewDescriptionCard = (newDescription: string) => {
    onSaveNewDescriptionCard(itemCard.id, newDescription);
  };

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitleCard(event.target.value);
  };

  const handleChangeNewComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCommentCard(event.target.value);
  };

  const handelClickSaveTitleCard = () => {
    onClickSaveTitleCardModal(newTitleCard);
    setTitleCard(newTitleCard);
    setCheckEditTitleCard(false);
  };

  const handelClickSaveNewComment = () => {
    if (newCommentCard.trim().length) {
      onAddNewComments(itemCard.id, newCommentCard);
      setNewCommentCard("");
    }
    setNewCommentCard("");
  };

  const handelClickCanselNewComment = () => {
    setNewCommentCard("");
  };

  return (
    <Root>
      <CardModalBlock>
        <NameAuthor>Create by: {itemCard.author}</NameAuthor>
        <NameAuthor>Status: {columnName}</NameAuthor>
        {checkEditTitleCard ? (
          <FlexBlock>
            <StyledInput value={newTitleCard} onChange={handleChangeCardName} />
            <StyledButtonIcon
              icon={<SvgCheckMark />}
              onClick={handelClickSaveTitleCard}
            />
          </FlexBlock>
        ) : (
          <FlexBlock>
            <TitleBlock>{itemCard.title}</TitleBlock>
            <StyledButtonIcon
              icon={<SvgPencil />}
              onClick={() => setCheckEditTitleCard(true)}
            />
          </FlexBlock>
        )}
        <StyledButtonIconClose
          icon={<SvgClose />}
          onClick={onActiveCardModel}
        />
        <Description
          description={itemCard.description}
          handleSaveNewDescriptionCard={handleSaveNewDescriptionCard}
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
            {commentsCard
              .filter((elem) => elem.cardId === itemCard.id)
              .map((elem) => (
                <Comment
                  key={elem.commentId}
                  commentItem={elem}
                  onDeleteComments={onDeleteComments}
                  onChangeTextComment={onChangeTextComment}
                />
              ))}
          </ContainerComments>
        </>
      </CardModalBlock>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
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

const CardModalBlock = styled.div`
  position: relative;
  width: 60%;
  max-height: 80vh;
  padding: 30px;
  border-radius: 5px;
  background-color: ${COLORS.zambezi};
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
  user-select: none;
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
