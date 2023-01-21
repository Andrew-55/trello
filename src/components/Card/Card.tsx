import { COLORS } from "constants/";

import React, { FC, useMemo, useState } from "react";

import { CardModal, CheckDelete } from "components";
import { CardInterface, CommentInterface } from "interfaces";
import styled from "styled-components";
import { SvgComment, SvgDelete, SvgPencil } from "svg";
import { Button, ButtonIcon, Input } from "ui";

type PropsCard = {
  card: CardInterface;
  comments: CommentInterface[];
  columnName: string;
  onSaveNewDescriptionCard: (cardId: string, newDescription: string) => void;
  onSaveNewTitleCard: (cardId: string, newTitle: string) => void;
  onDeleteCardState: (cardId: string) => void;
  onAddNewComments: (cardId: string, comment: string) => void;
  onDeleteComments: (commentId: string) => void;
  onChangeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Card: FC<PropsCard> = ({
  card,
  comments,
  columnName,
  onSaveNewDescriptionCard,
  onSaveNewTitleCard,
  onDeleteCardState,
  onAddNewComments,
  onDeleteComments,
  onChangeTextComment,
}) => {
  const [titleCard, setTitleCard] = useState(card.title);
  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const { id } = card ?? {};

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleCard(event.target.value);
  };

  const handleActiveCardModel = () => {
    setIsCardModalVisible((prevState) => !prevState);
  };

  const handelClickSaveTitleCard = () => {
    onSaveNewTitleCard(id, titleCard);
    setIsTitleCardEditEnable(false);
  };

  const handelCliclCancelSaveTitleCard = () => {
    setTitleCard(card.title);
    setIsTitleCardEditEnable(false);
  };

  const handelClickDeleteCard = () => {
    onDeleteCardState(id);
    setIsConfirmDeleteVisible(false);
  };

  const handelClickSaveTitleCardModal = (newTitleCard: string) => {
    onSaveNewTitleCard(id, newTitleCard);
    setTitleCard(newTitleCard);
  };

  const handelClickCancelCard = () => {
    setIsConfirmDeleteVisible(false);
  };

  let countComments = useMemo(() => {
    const sortCommentsCard = comments.filter((elem) => elem.cardId === id);
    return sortCommentsCard.length;
  }, [comments, id]);

  return (
    <>
      <Root>
        {isTitleCardEditEnable ? (
          <>
            <StyledInput value={titleCard} onChange={handleChangeCardName} />
            <WrapButton>
              <Button text="Save" onClick={handelClickSaveTitleCard} />
              <Button text="Cancel" onClick={handelCliclCancelSaveTitleCard} />
            </WrapButton>
          </>
        ) : (
          <>
            <ButtonPencil
              icon={<SvgPencil />}
              onClick={() => setIsTitleCardEditEnable(true)}
            />
            <ButtonDelete
              icon={<SvgDelete />}
              onClick={() => setIsConfirmDeleteVisible(true)}
            />
            <WrapContentCard onClick={() => setIsCardModalVisible(true)}>
              <TitleCard>{titleCard}</TitleCard>

              {!!countComments && (
                <FlexBlock>
                  <SvgComment width={25} height={25} fill={COLORS.white} />
                  <div>{countComments}</div>
                </FlexBlock>
              )}
            </WrapContentCard>
          </>
        )}
      </Root>

      {isConfirmDeleteVisible && (
        <CheckDelete
          question="Do you really want to delete the card?"
          onClickDelete={handelClickDeleteCard}
          onClickCancel={handelClickCancelCard}
        />
      )}

      {isCardModalVisible && (
        <CardModal
          columnName={columnName}
          comments={comments}
          card={card}
          onActiveCardModel={handleActiveCardModel}
          onSaveNewDescriptionCard={onSaveNewDescriptionCard}
          onClickSaveTitleCardModal={handelClickSaveTitleCardModal}
          onAddNewComments={onAddNewComments}
          onDeleteComments={onDeleteComments}
          onChangeTextComment={onChangeTextComment}
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

const ButtonPencil = styled(ButtonIcon)`
  position: absolute;
  width: 32px;
  height: 32px;
  right: 10px;
  border-radius: 20%;
  fill: ${COLORS.white_smoke};

  &:hover {
    fill: ${COLORS.light_green};
    background-color: ${COLORS.zambezi};
  }
`;

const ButtonDelete = styled(ButtonIcon)`
  position: absolute;
  width: 32px;
  height: 32px;
  bottom: 5px;
  right: 10px;
  fill: ${COLORS.white_smoke};

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
