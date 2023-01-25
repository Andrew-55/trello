import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CheckDelete } from "components";
import styled from "styled-components";
import { Button, Textarea } from "ui";

type Props = {
  description: string;
  onSaveNewDescriptionCard: (newDescription: string) => void;
};

export const Description: FC<Props> = ({
  description,
  onSaveNewDescriptionCard,
}) => {
  const [descriptionCard, setDescriptionCard] = useState(description);
  const [isDescriptionEditEnable, setIsDescriptionEditEnable] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionCard(event.target.value);
  };

  const handelClickSaveDescription = () => {
    onSaveNewDescriptionCard(descriptionCard);
    setDescriptionCard(descriptionCard);
    setIsDescriptionEditEnable(false);
  };

  const handelClickCanselSaveDescription = () => {
    setDescriptionCard(description);
    setIsDescriptionEditEnable(false);
  };

  const handelClickDeleteDescription = () => {
    onSaveNewDescriptionCard("");
    setDescriptionCard("");
    setIsConfirmDeleteVisible(false);
  };

  const handelClickCancelDescription = () => {
    setIsConfirmDeleteVisible(false);
  };

  return (
    <Root>
      <FlexBlock>
        <TitleDescription>Description</TitleDescription>

        {isDescriptionEditEnable ? (
          <WrapButton>
            <Button text="Save" onClick={handelClickSaveDescription} />
            <Button text="Cancel" onClick={handelClickCanselSaveDescription} />
          </WrapButton>
        ) : (
          <WrapButton>
            {descriptionCard ? (
              <>
                <Button
                  text="Edit"
                  onClick={() => setIsDescriptionEditEnable(true)}
                />
                <Button
                  text="Delete"
                  onClick={() => setIsConfirmDeleteVisible(true)}
                />
              </>
            ) : (
              <Button
                text="Add"
                onClick={() => setIsDescriptionEditEnable(true)}
              />
            )}
          </WrapButton>
        )}
      </FlexBlock>

      {isDescriptionEditEnable ? (
        <Textarea
          value={descriptionCard}
          onChange={handleChangeDescription}
          placeholder="Write a description..."
          autoFocus
        />
      ) : (
        <TextDescription>{descriptionCard}</TextDescription>
      )}

      {isConfirmDeleteVisible && (
        <CheckDelete
          question="Do you really want to delete the description?"
          onClickDelete={handelClickDeleteDescription}
          onClickCancel={handelClickCancelDescription}
        />
      )}
    </Root>
  );
};

const Root = styled.div`
  color: ${COLORS.white_smoke};
  margin-bottom: 50px;
`;

const FlexBlock = styled.div`
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
