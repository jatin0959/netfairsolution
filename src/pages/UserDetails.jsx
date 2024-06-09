import React from "react";
import SEO from "../common/seo";
import UserDetails from "../components/UserDetails/UserDetails";
import Wrapper from "../layout/wrapper";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Softec - Data analytics"} />
      <UserDetails />
    </Wrapper>
  );
};

export default index;
