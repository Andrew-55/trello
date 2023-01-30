import React, { FC } from "react";

import { useOnClickOutside } from "hoc";
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

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  return (
    <div ref={ref}>
      <Form
        initialValues={title}
        onCancel={onClose}
        onConfirm={handleChangeTitle}
      />
    </div>
  );
};
