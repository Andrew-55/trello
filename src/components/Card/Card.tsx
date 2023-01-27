import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CardModal, CheckDelete } from "components";
import { FormGetTitleCard } from "components/Card";
import { CardInterface } from "redux/card";
import { deleteCard, changeNameCard } from "redux/card";
import { getCountCommentsByCardId } from "redux/comment";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { SvgComment, SvgDelete, SvgPencil } from "svg";
import { ButtonIcon } from "ui";

type PropsCard = {
  card: CardInterface;
};

export type CardNameFormValues = {
  titleCard: string;
};

export const Card: FC<PropsCard> = ({ card }) => {
  const { id, title } = card ?? {};
  const countComments = useAppSelector(getCountCommentsByCardId(id));

  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleActiveCardModel = () => {
    setIsCardModalVisible((prevState) => !prevState);
  };

  const handleCloseTitleCardEdit = () => {
    setIsTitleCardEditEnable(false);
  };

  const handleGetCartNameForm = (titleCard: string) => {
    dispatch(changeNameCard({ id, titleCard }));
    setIsTitleCardEditEnable(false);
  };

  const handelClickDeleteCard = () => {
    dispatch(deleteCard(id));
    setIsConfirmDeleteVisible(false);
  };

  const handleClickCancelDeleteCard = () => {
    setIsConfirmDeleteVisible(false);
  };

  return (
    <>
      <Root>
        {isTitleCardEditEnable ? (
          <FormGetTitleCard
            title={card.title}
            onCloseTitleCardEdit={handleCloseTitleCardEdit}
            onGetCartNameForm={handleGetCartNameForm}
          />
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
              <TitleCard>{title}</TitleCard>

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
          onClickCancel={handleClickCancelDeleteCard}
        />
      )}

      {isCardModalVisible && (
        <CardModal card={card} onActiveCardModel={handleActiveCardModel} />
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

const TitleCard = styled.h3`
  margin-bottom: 25px;
  max-width: 85%;
  overflow-wrap: break-word;
`;
