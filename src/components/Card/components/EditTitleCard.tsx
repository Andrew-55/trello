import React, { FC } from "react";

import { CardInterface } from "redux/card";
import { changeNameCard } from "redux/card";
import { useAppDispatch } from "redux/hooks";

type FormFCProps = {
  title: string;
  onClose: () => void;
  onConfirm: (titleCard: string) => void;
};

type Props = {
  card: CardInterface;
  Form: React.FC<FormFCProps>;
  onClose: () => void;
};

export const EditTitleCard: FC<Props> = ({ card, Form, onClose }) => {
  const { id, title } = card ?? {};

  const dispatch = useAppDispatch();

  const handleChangeTitle = (titleCard: string) => {
    dispatch(changeNameCard({ id, titleCard }));
    onClose();
  };

  return <Form title={title} onClose={onClose} onConfirm={handleChangeTitle} />;
};
