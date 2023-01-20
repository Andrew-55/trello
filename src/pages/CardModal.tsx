import { COLORS } from "constants/COLORS";
import { ZINDEX } from "constants/ZINDEXS";

import React, { FC, useState } from "react";

import { Comment } from "components/Comment";
import { Description } from "components/Description";
import styled from "styled-components";
import { SvgCheckMark, SvgClose, SvgPencil } from "svg";
import { Button, Input, Textarea } from "ui";

type Props = {
  onActiveCardModel: () => void;
  itemCard: {
    id: string;
    title: string;
    description: string;
    columnId: string;
    author: string;
  };
  commentsCard: {
    commentId: string;
    cardId: string;
    author: string;
    comment: string;
  }[];
  columnName: string;
  saveNewDescriptionCard: (cardId: string, newDescription: string) => void;
  onClickSaveTitleCardModal: (newTitleCard: string) => void;
  addNewComments: (cardId: string, comment: string) => void;
  deleteComments: (commentId: string) => void;
  changeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const CardModal: FC<Props> = ({
  onActiveCardModel,
  itemCard,
  commentsCard,
  columnName,
  saveNewDescriptionCard,
  onClickSaveTitleCardModal,
  addNewComments,
  deleteComments,
  changeTextComment,
}) => {
  const [titleCard, setTitleCard] = useState(itemCard.title);
  const [newTitleCard, setNewTitleCard] = useState(titleCard);
  const [editTitleCard, setEditTitleCard] = useState(false);
  const [newCommentCard, setNewCommentCard] = useState("");

  const handleSaveNewDescriptionCard = (newDescription: string) => {
    saveNewDescriptionCard(itemCard.id, newDescription);
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
    setEditTitleCard(false);
  };

  const handelClickSaveNewComment = () => {
    if (newCommentCard.trim().length) {
      addNewComments(itemCard.id, newCommentCard);
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
        {!editTitleCard ? (
          <FlexBlock>
            <TitleBlock>{itemCard.title}</TitleBlock>
            <WrapSvgPencil onClick={() => setEditTitleCard(true)}>
              <SvgPencil width={30} height={30} fill={COLORS.white_smoke} />
            </WrapSvgPencil>
          </FlexBlock>
        ) : (
          <FlexBlock>
            <StyledInput value={newTitleCard} onChange={handleChangeCardName} />
            <WrapSvgPencil onClick={() => handelClickSaveTitleCard()}>
              <SvgCheckMark width={30} height={30} fill={COLORS.white_smoke} />
            </WrapSvgPencil>
          </FlexBlock>
        )}
        <WrapSvg onClick={onActiveCardModel}>
          <SvgClose width={35} height={35} fill={COLORS.white_smoke} />
        </WrapSvg>
        <Description
          description={itemCard.description}
          handleSaveNewDescriptionCard={handleSaveNewDescriptionCard}
        />
        <WrapComment>
          <TitleComment>Comments</TitleComment>
          <StyledTextArea
            value={newCommentCard}
            onChange={handleChangeNewComment}
            placeholder="Write a comment ...."
          />
          <WrapButton>
            <StyledButton
              text="Add"
              onClick={() => handelClickSaveNewComment()}
            />
            <StyledButton
              text="Cancel"
              onClick={() => handelClickCanselNewComment()}
            />
          </WrapButton>
          <ContainerComments>
            {commentsCard
              .filter((elem) => elem.cardId === itemCard.id)
              .map((elem) => (
                <Comment
                  key={elem.commentId}
                  commentItem={elem}
                  deleteComments={deleteComments}
                  changeTextComment={changeTextComment}
                />
              ))}
          </ContainerComments>
        </WrapComment>
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
  z-index: ${ZINDEX.carsModal};
`;

const WrapSvg = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  &:hover {
    background-color: ${COLORS.gray};
  }
`;

const FlexBlock = styled.div`
  display: flex;
  column-gap: 30px;
  margin-bottom: 30px;
`;

const WrapSvgPencil = styled.div`
  cursor: pointer;
  width: min-content;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 20%;
  &:hover {
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

const WrapComment = styled.div``;

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
