import { COLORS } from "constants/";

import React, { FC, useState } from "react";

import { CheckDelete } from "components";
import styled from "styled-components";
import { Button, Textarea } from "ui";

type Props = {
  description: string;
  handleSaveNewDescriptionCard: (newDescription: string) => void;
};

export const Description: FC<Props> = ({
  description,
  handleSaveNewDescriptionCard,
}) => {
  const [descriptionCard, setDescriptionCard] = useState(description);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionCard(event.target.value);
  };

  const handelClickSaveDescription = () => {
    handleSaveNewDescriptionCard(descriptionCard);
    setDescriptionCard(descriptionCard);
    setCheckEdit(false);
  };

  const handelClickCanselSaveDescription = () => {
    setDescriptionCard(description);
    setCheckEdit(false);
  };

  const handelClickDeleteDescription = () => {
    handleSaveNewDescriptionCard("");
    setDescriptionCard("");
    setCheckDelete(false);
  };

  const handelClickCancelDescription = () => {
    setCheckDelete(false);
  };

  return (
    <Root>
      <FlexBlock>
        <TitleDescription>Description</TitleDescription>
        {checkEdit ? (
          <WrapButton>
            <Button text="Save" onClick={handelClickSaveDescription} />
            <Button text="Cancel" onClick={handelClickCanselSaveDescription} />
          </WrapButton>
        ) : (
          <WrapButton>
            {descriptionCard ? (
              <>
                <Button text="Edit" onClick={() => setCheckEdit(true)} />
                <Button text="Delete" onClick={() => setCheckDelete(true)} />
              </>
            ) : (
              <Button text="Add" onClick={() => setCheckEdit(true)} />
            )}
          </WrapButton>
        )}
      </FlexBlock>
      {checkEdit ? (
        <Textarea
          value={descriptionCard}
          onChange={handleChangeDescription}
          placeholder="Write a description..."
        />
      ) : (
        <TextDescription>{descriptionCard}</TextDescription>
      )}
      {checkDelete && (
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
  margin-left: 20px;
`;
