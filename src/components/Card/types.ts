export type CardTitleFormProps = {
  initialValues: string;
  onCancel?: () => void;
  onConfirm: (titleCard: string) => void;
};
