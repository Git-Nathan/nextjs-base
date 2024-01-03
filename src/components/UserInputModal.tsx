import { INewUser } from "@/models/user";
import { Button, Modal } from "antd";
import { useState } from "react";
import UserInputForm from "./UserInputForm";

export interface IUserInputModalProps {
  isEdit?: boolean;
  data?: INewUser;
  className?: string;
  id?: string;
}

export function UserInputModal({
  isEdit = false,
  data,
  className,
  id,
}: IUserInputModalProps) {
  const [openUserInputModal, setOpenUserInputModal] = useState<boolean>(false);

  const handleCancel = () => {
    setOpenUserInputModal(false);
  };

  return (
    <>
      <Button
        className={className}
        type={!isEdit ? "primary" : "default"}
        onClick={() => {
          setOpenUserInputModal(true);
        }}
      >
        {!isEdit ? "Thêm người dùng" : "Sửa"}
      </Button>
      <Modal
        open={openUserInputModal}
        title={!isEdit ? "Thêm người dùng" : "Sửa người dùng"}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <UserInputForm
          id={id as string}
          data={data}
          isEdit={isEdit}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
