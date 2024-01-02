"use client";

import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IAppHeaderProps {}

export function AppHeader(props: IAppHeaderProps) {
  const [profile, setProfile] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("profile");
    window.location.replace("/login");
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile") as string));
  }, []);

  return (
    <Header className="!bg-primary-white font-nunito flex h-24 justify-between px-10">
      <h1 className="flex h-full items-center text-4xl font-bold">Tổng quan</h1>
      <div className="flex h-full items-center px-4">
        <Image
          className="ml-10"
          width={24}
          height={24}
          alt="user"
          src="/icons/user.svg"
        />

        {/* <p className="ml-2 text-base">{profile.fullname || ""}</p> */}

        <Button danger className="font-nunito ml-4" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </Header>
  );
}
