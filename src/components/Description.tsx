import React, { FC, useState } from "react";

import styled from "styled-components";
import { Button, Textarea } from "ui";

import { COLORS } from "../constants/COLORS";

type Props = {
  description: string;
  handleSaveNewDescriptionCard: (newDescription: string) => void;
};

export const Description: FC<Props> = ({
  description,
  handleSaveNewDescriptionCard,
}) => {
  const [descriptionCard, setDescriptionCard] = useState(description);
  const [newDescriptionCard, setnewDescriptionCard] = useState(descriptionCard);
  const [edit, setEdit] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setnewDescriptionCard(event.target.value);
  };

  const handelClickSaveDescription = () => {
    handleSaveNewDescriptionCard(newDescriptionCard);
    setDescriptionCard(newDescriptionCard);
    setEdit(false);
  };

  const handelClickCanselSaveDescription = () => {
    setnewDescriptionCard(descriptionCard);
    setEdit(false);
  };

  const handelClickDeleteDescription = () => {
    handleSaveNewDescriptionCard("");
    setDescriptionCard("");
    setnewDescriptionCard("");
    setCheckDelete(false);
  };

  return (
    <Root>
      <FlexBlock>
        <TitleDescription>Description</TitleDescription>
        {!edit ? (
          <WrapButton>
            {descriptionCard ? (
              <>
                <StyledButton text="Edit" onClick={() => setEdit(true)} />
                <StyledButton
                  text="Delete"
                  onClick={() => setCheckDelete(true)}
                />
              </>
            ) : (
              <StyledButton text="Add" onClick={() => setEdit(true)} />
            )}
          </WrapButton>
        ) : (
          <WrapButton>
            <StyledButton
              text="Save"
              onClick={() => handelClickSaveDescription()}
            />
            <StyledButton
              text="Cancel"
              onClick={() => handelClickCanselSaveDescription()}
            />
          </WrapButton>
        )}
      </FlexBlock>
      {!edit ? (
        <TextDescription>{descriptionCard}</TextDescription>
      ) : (
        <StyledTextArea
          value={newDescriptionCard}
          onChange={handleChangeDescription}
        />
      )}
      {checkDelete && (
        <CheckDeleteBlock>
          <TitleCheckDelete>
            Do you really want to delete the description?
          </TitleCheckDelete>
          <WrapButton>
            <StyledButton
              text="Yes"
              onClick={() => handelClickDeleteDescription()}
            />
            <StyledButton text="Cancel" onClick={() => setCheckDelete(false)} />
          </WrapButton>
        </CheckDeleteBlock>
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

const StyledButton = styled(Button)``;

const StyledTextArea = styled(Textarea)``;

const CheckDeleteBlock = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  padding: 20px 30px;
  background-color: ${COLORS.gray};
  border-radius: 15px;
  box-shadow: 0 0 25px ${COLORS.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleCheckDelete = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;
