import React from "react";
import Menu from "../components/admin/Menu";
import Header from "../components/admin/Header";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row">
      <Menu />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
