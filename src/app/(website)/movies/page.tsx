"use client";
import { movieStoreIntance } from "@/mobx/movie";
import { IMovie } from "@/models/movie";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";

const MoviesPage = () => {
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const [store] = useState(() => movieStoreIntance);

  const columns: ColumnsType<IMovie> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 1,
    },
  ];

  const getAllMovies = useCallback(() => {
    store.getAllMovies({
      token: profile.token,
      username: profile.username,
    });
  }, [profile.token, profile.username, store]);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <div className="mt-2 px-10">
      <h2 className="text-base font-bold">Danh sách phim</h2>
      <div className="my-4 flex w-full items-center justify-end">
        <Button onClick={getAllMovies} className="font-nunito">
          Làm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={store.movieList}
        loading={store.loading}
        size="middle"
        virtual
        scroll={{ x: 1500, y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};

export default observer(MoviesPage);
