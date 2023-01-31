import { COLORS, Z_INDEX } from "constants/";

import React, { FC, useEffect, useState } from "react";

import { Comment, Description } from "components";
import { EditTitleCard } from "components/Card/";
import { AddCommentForm, CardModalCardTitleForm } from "components/CardModal";
import { useOnClickOutside } from "hoc";
import { CardInterface } from "redux/card";
import { changeDescriptionCard } from "redux/card";
import { getColumnNameByColumnId } from "redux/column";
import { addComment, getCommentsByCardId } from "redux/comment";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getUsername } from "redux/user";
import styled from "styled-components";
import { SvgClose, SvgPencil } from "svg";
import { ButtonIcon } from "ui";

type Props = {
  card: CardInterface;
  onActiveCardModel: () => void;
};

export const CardModal: FC<Props> = ({ onActiveCardModel, card }) => {
  const commentsCard = useAppSelector(getCommentsByCardId(card.id));
  const username = useAppSelector(getUsername);
  const columnName = useAppSelector(getColumnNameByColumnId(card.columnId));

  const [isTitleCardEditEnable, setIsTitleCardEditEnable] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = card;

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onActiveCardModel();
      }
    };
    document.body.addEventListener("keydown", handleEscapePress);
    return () =>
      document.body.removeEventListener("keydown", handleEscapePress);
  });

  const handleSaveDescriptionCard = (newDescription: string) => {
    dispatch(changeDescriptionCard({ id, newDescription }));
  };

  const handleCloseTitleCardEdit = () => {
    setIsTitleCardEditEnable(false);
  };

  const handleSaveNewComment = (newCommentCard: string) => {
    dispatch(addComment({ id, username, newCommentCard }));
  };

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onActiveCardModel);

  return (
    <Root>
      <CardModalBlock ref={ref}>
        <NameAuthor>Create by: {card.author}</NameAuthor>
        <NameAuthor>Status: {columnName}</NameAuthor>

        <WrapCardTitle>
          {isTitleCardEditEnable ? (
            <EditTitleCard
              card={card}
              onClose={handleCloseTitleCardEdit}
              Form={CardModalCardTitleForm}
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
        </WrapCardTitle>

        <StyledButtonIconClose
          icon={<SvgClose />}
          onClick={onActiveCardModel}
        />
        <Description
          description={card.description}
          onSaveDescriptionCard={handleSaveDescriptionCard}
        />
        <>
          <TitleComment>Comments</TitleComment>
          <AddCommentForm onConfirm={handleSaveNewComment} />
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

const CardModalBlock = styled.div`
  position: relative;
  width: 60%;
  min-width: 500px;
  padding: 30px;
  border-radius: 5px;
  background-color: ${COLORS.zambezi};
`;

const WrapCardTitle = styled.div`
  width: 60%;
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
