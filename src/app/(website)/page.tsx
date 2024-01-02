"use client";

import { Spin } from "antd";
import { useEffect } from "react";

export interface IMainPageProps {}

export default function MainPage(props: IMainPageProps) {
  useEffect(() => {
    // redirect("/products");
  }, []);

  return (
    <div className="flex h-[80vh] w-full items-center justify-center bg-[#ffffff8f]">
      <Spin size="large" />
    </div>
  );
}
