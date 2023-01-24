import { COLORS } from "constants/";

import React, { FC, useMemo, useState } from "react";

import { CardModal, CheckDelete } from "components";
import { CardInterface } from "interfaces";
import { deleteCard, changeNameCard } from "redux/card/slice";
import { deleteAllCommentByCardId } from "redux/comment/slice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { SvgComment, SvgDelete, SvgPencil } from "svg";
import { Button, ButtonIcon, Input } from "ui";
import { getCommentsByCardId } from "utils/logic-functions";

type PropsCard = {
  card: CardInterface;
  columnName: string;
};

export const Card: FC<PropsCard> = ({ card, columnName }) => {
  const comments = useAppSelector((state) => state.comments.comments);

  const [titleCard, setTitleCard] = useState(card.title);
  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const dispatch = useAppDispatch();

  const { id } = card ?? {};

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleCard(event.target.value);
  };

  const handleActiveCardModel = () => {
    setIsCardModalVisible((prevState) => !prevState);
  };

  const handleClickEditTitleCard = () => {
    setTitleCard(card.title);
    setIsTitleCardEditEnable(true);
  };

  const handelClickSaveTitleCard = () => {
    dispatch(changeNameCard({ id, titleCard }));
    setIsTitleCardEditEnable(false);
  };

  const handelCliclCancelSaveTitleCard = () => {
    setTitleCard(card.title);
    setIsTitleCardEditEnable(false);
  };

  const handelClickDeleteCard = () => {
    dispatch(deleteCard(id));
    dispatch(deleteAllCommentByCardId(id));
    setIsConfirmDeleteVisible(false);
  };

  const handelClickCancelCard = () => {
    setIsConfirmDeleteVisible(false);
  };

  let countComments = useMemo(() => {
    const commentsCart = getCommentsByCardId(comments, id);
    return commentsCart.length;
  }, [comments, id]);

  return (
    <>
      <Root>
        {isTitleCardEditEnable ? (
          <>
            <StyledInput
              value={titleCard}
              onChange={handleChangeCardName}
              autoFocus
            />
            <WrapButton>
              <Button text="Save" onClick={handelClickSaveTitleCard} />
              <Button text="Cancel" onClick={handelCliclCancelSaveTitleCard} />
            </WrapButton>
          </>
        ) : (
          <>
            <ButtonPencil
              icon={<SvgPencil />}
              onClick={handleClickEditTitleCard}
            />
            <ButtonDelete
              icon={<SvgDelete />}
              onClick={() => setIsConfirmDeleteVisible(true)}
            />
            <WrapContentCard onClick={() => setIsCardModalVisible(true)}>
              <TitleCard>{card.title}</TitleCard>

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
          card={card}
          onActiveCardModel={handleActiveCardModel}
        />
      )}
    </>
  );
};

const Root = styled.div`
  position: relative;
  color: ${COLORS.white};
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
  max-width: 85%;
  overflow-wrap: break-word;
`;

const StyledInput = styled(Input)`
  font-size: 15px;
  width: 100%;
  margin-bottom: 20px;
`;
