import FooterFive from "@/layout/footers/footer-2";
import HeaderTwo from "@/layout/headers/header-7";
import React from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import ContactFormArea from "./contact-form-area";
import ContactInner from "./contact-inner";
import CtaArea from "./cta-area";
import HeroBanner from "../../common/hero-banner";
import OfficeLocation from "./office-location";

const Contact = () => {
  return (
    <>
      <HeaderTwo />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title_top="Get In" title_bottom="Get In" />
            <HeroBanner bg_img="/assets/img/contact/contact-banner.jpg" />
            <OfficeLocation />
            <ContactFormArea />
            <ContactInner />
            <CtaArea />
          </main>
          <FooterFive style_contact={true} style_team={true} />
        </div>
      </div>
    </>
  );
};

export default Contact;
