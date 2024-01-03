import { Api } from "@/api/configs";
import { usersStoreIntance } from "@/mobx/user";
import { INewUser } from "@/models/user";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { toast } from "react-toastify";

export interface IUserInputFormProps {
  handleCancel: () => void;
  isEdit?: boolean;
  data?: INewUser;
  id: string;
}

function UserInputForm({
  handleCancel,
  isEdit = false,
  data = {
    name: "",
    email: "",
    image_user: "",
  },
  id,
}: IUserInputFormProps) {
  const profile = JSON.parse(localStorage.getItem("profile") as string);

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    if (!isEdit) {
    } else {
      const res = await Api.user.edit(
        {
          token: profile.token,
          username: profile.username,
        },
        id,
        {
          ...values,
        },
      );

      if (res.code === 200) {
        toast.success("Sửa thông tin người dùng thành công");
        usersStoreIntance.getAllUsers({
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
      <Form.Item<INewUser>
        label="Tên người dùng"
        name="name"
        rules={[
          { required: true, message: "Tên người dùng không được để trống!" },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<INewUser>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email không được để trống!" }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<INewUser>
        label="Đường dẫn ảnh đại diện"
        name="image_user"
        rules={[
          {
            required: true,
            message: "Đường dẫn ảnh đại diện không được để trống!",
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

export default observer(UserInputForm);
