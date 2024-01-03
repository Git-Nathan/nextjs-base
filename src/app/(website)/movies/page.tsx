"use client";
import { Api } from "@/api/configs";
import { MovieInputModal } from "@/components/MovieInputModal";
import { movieStoreIntance } from "@/mobx/movie";
import { IMovie } from "@/models/movie";
import { Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const MoviesPage = () => {
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const [store] = useState(() => movieStoreIntance);

  const handleDeleteMovie = async (id: number) => {
    const res = await Api.movie.delete(id.toString(), {
      token: profile.token,
      username: profile.username,
    });

    if (res.code === 200) {
      toast.success("Xóa phim thành công");
      store.getAllMovies({
        token: profile.token,
        username: profile.username,
      });
    } else {
      toast.success("Có gì đó không ổn");
    }
  };

  const columns: ColumnsType<IMovie> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 0.5,
    },
    {
      title: "Poster",
      dataIndex: "poster_url",
      key: "poster_url",
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
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Thể loại",
      dataIndex: "movie_genre",
      key: "movie_genre",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Số lượt xem",
      dataIndex: "movie_view",
      key: "movie_view",
      width: 1.5,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 3,
      render(value, record, index) {
        return <p className="truncate-4 w-full">{value}</p>;
      },
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      width: 2,
      fixed: "right",
      render(value, record, index) {
        return (
          <div key={index} className="flex flex-col">
            <div>
              <Button target="_blank" href={record.trailer_url} type="primary">
                Xem trailer
              </Button>
              <Button
                className="ml-4"
                target="_blank"
                href={record.video_url}
                type="primary"
              >
                Xem phim
              </Button>
            </div>
            <div className="mt-2">
              <MovieInputModal id={record.id.toString()} data={record} isEdit />
              <Popconfirm
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
              </Popconfirm>
            </div>
          </div>
        );
      },
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
      <div className="my-4 flex w-full items-center justify-between">
        <MovieInputModal />
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
