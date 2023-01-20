import { COLORS } from "constants/COLORS";
import { ZINDEX } from "constants/ZINDEXS";

import React, { FC, useState } from "react";

import { CardModal } from "pages/CardModal";
import styled from "styled-components";
import { SvgComment } from "svg/SvgComment";
import { SvgDelete } from "svg/SvgDelete";
import { SvgPencil } from "svg/SvgPencil";
import { Button, Input } from "ui";

type PropsCard = {
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
  saveNewTitleCard: (cardId: string, newTitle: string) => void;
  deleteCardState: (cardId: string) => void;
  addNewComments: (cardId: string, comment: string) => void;
  deleteComments: (commentId: string) => void;
  changeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Card: FC<PropsCard> = ({
  itemCard,
  commentsCard,
  saveNewDescriptionCard,
  saveNewTitleCard,
  deleteCardState,
  addNewComments,
  deleteComments,
  changeTextComment,
  columnName,
}) => {
  const [titleCard, setTitleCard] = useState(itemCard.title);
  const [newTitleCard, setNewTitleCard] = useState(titleCard);
  const [editTitleCard, setEditTitleCard] = useState(false);
  const [activeCardModel, setActiveCardModel] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitleCard(event.target.value);
  };

  const handleActiveCardModel = () => {
    setActiveCardModel(!activeCardModel);
  };

  const handelClickSaveTitleCard = () => {
    saveNewTitleCard(itemCard.id, newTitleCard);
    setTitleCard(newTitleCard);
    setEditTitleCard(false);
  };

  const handelClickDeleteCard = () => {
    deleteCardState(itemCard.id);
    setCheckDelete(false);
  };

  const onClickSaveTitleCardModal = (newTitleCard: string) => {
    saveNewTitleCard(itemCard.id, newTitleCard);
    setTitleCard(newTitleCard);
    setNewTitleCard(newTitleCard);
  };

  let countComments = commentsCard.filter(
    (elem) => elem.cardId === itemCard.id
  ).length;

  return (
    <>
      <Root>
        {!editTitleCard ? (
          <>
            <WrapSvgPencil onClick={() => setEditTitleCard(true)}>
              <SvgPencil width={20} height={20} fill={COLORS.white_smoke} />
            </WrapSvgPencil>
            <WrapSvgDelete onClick={() => setCheckDelete(true)}>
              <SvgDelete width={20} height={20} fill={COLORS.white_smoke} />
            </WrapSvgDelete>
            <WrapContentCard onClick={() => setActiveCardModel(true)}>
              <TitleCard>{titleCard}</TitleCard>
              {!!countComments && (
                <FlexBlock>
                  <SvgComment width={25} height={25} fill={COLORS.white} />
                  <div>{countComments}</div>
                </FlexBlock>
              )}
            </WrapContentCard>
          </>
        ) : (
          <div>
            <StyledInput value={newTitleCard} onChange={handleChangeCardName} />
            <WrapButton>
              <StyledButton
                text="Save"
                onClick={() => handelClickSaveTitleCard()}
              />
              <StyledButton
                text="Cancel"
                onClick={() => setEditTitleCard(false)}
              />
            </WrapButton>
          </div>
        )}
      </Root>
      {checkDelete && (
        <CheckDeleteBlock>
          <TitleCheckDelete>
            Do you really want to delete the card?
          </TitleCheckDelete>
          <WrapButton>
            <StyledButton text="Yes" onClick={() => handelClickDeleteCard()} />
            <StyledButton text="Cancel" onClick={() => setCheckDelete(false)} />
          </WrapButton>
        </CheckDeleteBlock>
      )}
      {!!activeCardModel && (
        <CardModal
          onActiveCardModel={handleActiveCardModel}
          saveNewDescriptionCard={saveNewDescriptionCard}
          onClickSaveTitleCardModal={onClickSaveTitleCardModal}
          itemCard={itemCard}
          columnName={columnName}
          commentsCard={commentsCard}
          addNewComments={addNewComments}
          deleteComments={deleteComments}
          changeTextComment={changeTextComment}
        />
      )}
    </>
  );
};

const Root = styled.div`
  position: relative;
  color: ${COLORS.white};
  width: 100%;
  min-height: 100px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${COLORS.gray};
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 2px 4px ${COLORS.black};
`;

const FlexBlock = styled.div`
  display: flex;
  column-gap: 10px;
`;

const WrapContentCard = styled.div`
  min-height: 80px;
`;

const WrapSvg = styled.div`
  display: inline-block;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 10px;
  padding: 5px;
  border-radius: 20%;
  &:hover {
    background-color: ${COLORS.zambezi};
  }
`;

const WrapSvgPencil = styled(WrapSvg)``;
const WrapSvgDelete = styled(WrapSvg)`
  bottom: 5px;
  &:hover {
    background-color: ${COLORS.red};
  }
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;

const TitleCard = styled.h3`
  margin-bottom: 25px;
`;

const StyledInput = styled(Input)`
  font-size: 15px;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)``;

const CheckDeleteBlock = styled.div`
  position: absolute;
  width: 200px;
  padding: 20px 30px;
  background-color: ${COLORS.gray};
  border-radius: 15px;
  box-shadow: 0 0 25px ${COLORS.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: ${ZINDEX.carsModal};
`;

const TitleCheckDelete = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;
