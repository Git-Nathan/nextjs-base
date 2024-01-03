"use client";
import { UserInputModal } from "@/components/UserInputModal";
import { usersStoreIntance } from "@/mobx/user";
import { IUser } from "@/models/user";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const UsersPage = () => {
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const [store] = useState(() => usersStoreIntance);

  const handleDeleteMovie = async (id: number) => {};

  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 0.5,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image_user",
      key: "image_user",
      width: 1,
      render(value, record, index) {
        const isSrcUrl = /^https?:\/\/\S+$/i.test(value);

        return (
          <div
            className="relative mx-auto flex h-[100px] w-[100px] justify-center"
            key={index}
          >
            {isSrcUrl ? (
              <Image
                src={value}
                alt={value}
                fill
                sizes="1x"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            ) : (
              <Image
                src="/images/no-img.jpg"
                width={100}
                height={100}
                alt={value}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      width: 1,
      fixed: "right",
      render(value, record, index) {
        return (
          <div key={index} className="mt-2">
            <UserInputModal
              id={record.id.toString()}
              data={{
                email: record.email,
                image_user: record.image_user,
                name: record.name,
              }}
              isEdit
            />
            {/* <Popconfirm
              title="Bạn có chắn muốn xoá?"
              okText="Xoá"
              cancelText="Hủy"
              onConfirm={() => {
                handleDeleteMovie(record.id);
              }}
            >
              <Button danger className="ml-4">
                Xóa
              </Button>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ];

  const getAllUsers = useCallback(() => {
    store.getAllUsers({
      token: profile.token,
      username: profile.username,
    });
  }, [profile.token, profile.username, store]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Danh sách người dùng</h2>
      <div className="my-4 flex w-full items-center justify-end">
        <Button onClick={getAllUsers} className="font-nunito">
          Làm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={store.userList}
        loading={store.loading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};

export default observer(UsersPage);
