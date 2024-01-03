import { INewMovie } from "@/models/movie";
import { Button, Modal } from "antd";
import { useState } from "react";
import MovieInputForm from "./MovieInputForm";

export interface IMovieInputModalProps {
  isEdit?: boolean;
  data?: INewMovie;
  className?: string;
  id?: string;
}

export function MovieInputModal({
  isEdit = false,
  data,
  className,
  id,
}: IMovieInputModalProps) {
  const [openMovieInputModal, setOpenMovieInputModal] =
    useState<boolean>(false);

  const handleCancel = () => {
    setOpenMovieInputModal(false);
  };

  return (
    <>
      <Button
        className={className}
        type={!isEdit ? "primary" : "default"}
        onClick={() => {
          setOpenMovieInputModal(true);
        }}
      >
        {!isEdit ? "Thêm phim" : "Sửa"}
      </Button>
      <Modal
        open={openMovieInputModal}
        title={!isEdit ? "Thêm phim" : "Sửa phim"}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <MovieInputForm
          id={id as string}
          data={data}
          isEdit={isEdit}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
