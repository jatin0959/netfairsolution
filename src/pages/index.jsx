import { useEffect } from "react";
import { useRouter } from "next/router";
import {firebase} from "../Firebase/config";
import "firebase/auth";
import SEO from "../common/seo";
import HomeTwo from "../components/homes/home-2";
import Wrapper from "../layout/wrapper";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, redirect to Dashboard page
        router.push("/Dashboard");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  return (
    <Wrapper>
      <SEO pageTitle={"Netfair Solutions"} />
      <HomeTwo />
    </Wrapper>
  );
};

export default Index;
