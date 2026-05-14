import type { FC } from "react";
import { ModalBase } from "../ModalBase";
import { CustomButton } from "../../CustomButton";

interface IModalAlertProps {
  setOpen: (value: boolean) => void;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ModalAlert: FC<IModalAlertProps> = ({
  setOpen,
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <ModalBase setOpen={setOpen}>
      <div className="flex flex-col gap-6 items-center">
        <p className="text-xl text-white-300">{text}</p>
        <div className="flex flex-row gap-4">
          <CustomButton
            className="h-10"
            text="Cancelar"
            disabled={disabled}
            onClick={() => setOpen(false)}
          />
          <CustomButton
            className="h-10"
            text="Eliminar"
            disabled={disabled}
            onClick={onClick}
          />
        </div>
      </div>
    </ModalBase>
  );
};
