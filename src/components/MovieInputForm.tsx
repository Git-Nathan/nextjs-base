import { Api } from "@/api/configs";
import { movieStoreIntance } from "@/mobx/movie";
import { INewMovie } from "@/models/movie";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { toast } from "react-toastify";

export interface IMovieInputFormProps {
  handleCancel: () => void;
  isEdit?: boolean;
  data?: INewMovie;
  id: string;
}

function MovieInputForm({
  handleCancel,
  isEdit = false,
  data = {
    title: "",
    description: "",
    trailer_url: "",
    video_url: "",
    poster_url: "",
    movie_genre: "",
    movie_view: "0",
  },
  id,
}: IMovieInputFormProps) {
  const profile = JSON.parse(localStorage.getItem("profile") as string);

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    if (!isEdit) {
      const res = await Api.movie.add(
        {
          token: profile.token,
          username: profile.username,
        },
        { ...values, movie_view: "0" },
      );

      if (res.code === 201) {
        toast.success("Thêm phim thành công");
        movieStoreIntance.getAllMovies({
          token: profile.token,
          username: profile.username,
        });
        handleCancel();
      } else {
        toast.success("Có gì đó không ổn");
      }
    } else {
      const res = await Api.movie.edit(
        id,
        {
          token: profile.token,
          username: profile.username,
        },
        {
          ...values,
          movie_view: "0",
        },
      );

      if (res.code === 200) {
        toast.success("Sửa phim thành công");
        movieStoreIntance.getAllMovies({
          token: profile.token,
          username: profile.username,
        });
        handleCancel();
      } else {
        toast.success("Có gì đó không ổn");
      }
    }

    setIsLoading(false);
  };

  return (
    <Form
      name="product"
      labelCol={{ span: 10 }}
      style={{ maxWidth: 800 }}
      initialValues={{
        ...data,
      }}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-4"
    >
      <Form.Item<INewMovie>
        label="Tên phim"
        name="title"
        rules={[{ required: true, message: "Tên phim không được để trống!" }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<INewMovie>
        label="Đường dẫn poster phim"
        name="poster_url"
        rules={[
          {
            required: true,
            message: "Đường dẫn poster phim không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item<INewMovie>
        label="Đường dẫn trailer phim"
        name="trailer_url"
        rules={[
          {
            required: true,
            message: "Đường dẫn trailer phim không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item<INewMovie>
        label="Đường dẫn phim"
        name="video_url"
        rules={[
          {
            required: true,
            message: "Đường dẫn phim không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item<INewMovie>
        label="Thể loại phim"
        name="movie_genre"
        rules={[
          { required: true, message: "Thể loại phim không được để trống!" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<INewMovie>
        label="Mô tả phim"
        name="description"
        rules={[
          {
            required: true,
            message: "Mô tả phim không được để trống!",
          },
        ]}
      >
        <TextArea rows={4} allowClear />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <div className="flex justify-end">
          <Button key="back" onClick={handleCancel}>
            Huỷ bỏ
          </Button>
          <Button
            loading={isLoading}
            className="ml-4"
            type="primary"
            htmlType="submit"
          >
            {!isEdit ? "Thêm" : "Sửa"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default observer(MovieInputForm);
