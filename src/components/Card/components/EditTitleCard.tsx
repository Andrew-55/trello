import React, { FC } from "react";

import { CardInterface } from "redux/card";
import { changeNameCard } from "redux/card";
import { useAppDispatch } from "redux/hooks";

import { CardTitleFormProps } from "../types";

type Props = {
  card: CardInterface;
  Form: React.FC<CardTitleFormProps>;
  onClose: () => void;
};

export const EditTitleCard: FC<Props> = ({ card, Form, onClose }) => {
  const { id, title } = card ?? {};

  const dispatch = useAppDispatch();

  const handleChangeTitle = (titleCard: string) => {
    dispatch(changeNameCard({ id, titleCard }));
    onClose();
  };

  return (
    <Form
      initialValues={title}
      onClose={onClose}
      onConfirm={handleChangeTitle}
    />
  );
};
