import { COLORS } from "constants/";

import React, { FC, useEffect, useState } from "react";

import { CheckDelete } from "components";
import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Button, Textarea } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

type Props = {
  description: string;
  onSaveDescriptionCard: (newDescription: string) => void;
};

type DescriptionFormValues = {
  description: string;
};

export const Description: FC<Props> = ({
  description,
  onSaveDescriptionCard,
}) => {
  const [isDescriptionEditEnable, setIsDescriptionEditEnable] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      description: description,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  const handleSaveCancel = () => {
    setIsDescriptionEditEnable(false);
    reset();
  };

  const handleDeleteClick = () => {
    onSaveDescriptionCard("");
    setValue("description", "");
    setIsConfirmDeleteVisible(false);
  };

  const handleCancelClick = () => {
    setIsConfirmDeleteVisible(false);
  };

  const onSubmit: SubmitHandler<DescriptionFormValues> = ({
    description,
  }: DescriptionFormValues) => {
    onSaveDescriptionCard(description);
    setIsDescriptionEditEnable(false);
  };

  return (
    <Root>
      {isDescriptionEditEnable ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <WrapDescriptionTitle>
            <TitleDescription>Description</TitleDescription>
            <WrapButton>
              <Button text="Save" type="submit" />
              <Button text="Cancel" type="button" onClick={handleSaveCancel} />
            </WrapButton>
          </WrapDescriptionTitle>
          <Textarea
            {...register("description", {
              validate: checkStringIsEmpty,
            })}
            placeholder="Write a description..."
            autoFocus
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </form>
      ) : (
        <>
          <WrapDescriptionTitle>
            <TitleDescription>Description</TitleDescription>
            {description ? (
              <>
                <WrapButton>
                  <Button
                    text="Edit"
                    onClick={() => {
                      setIsDescriptionEditEnable(true);
                    }}
                  />
                  <Button
                    text="Delete"
                    onClick={() => setIsConfirmDeleteVisible(true)}
                  />
                </WrapButton>
              </>
            ) : (
              <Button
                text="Add"
                onClick={() => setIsDescriptionEditEnable(true)}
              />
            )}
          </WrapDescriptionTitle>
          <TextDescription>{description}</TextDescription>
        </>
      )}

      {isConfirmDeleteVisible && (
        <CheckDelete
          question="Do you really want to delete the description?"
          onDeleteClick={handleDeleteClick}
          onCancelClick={handleCancelClick}
        />
      )}
    </Root>
  );
};

const Root = styled.div`
  color: ${COLORS.white_smoke};
  margin-bottom: 50px;
`;

const WrapDescriptionTitle = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;

const TitleDescription = styled.h2`
  font-size: 25px;
  font-weight: 700;
`;

const TextDescription = styled.p`
  width: 95%;
  margin-left: 20px;
  overflow-wrap: break-word;
`;
