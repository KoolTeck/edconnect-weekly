import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  // props.user.test = "test";
  const user = props.user;

  return (
    <>
      <Header user={user} />
      <main className="mx-auto">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
