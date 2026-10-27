import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FooterHome from "../layout/footers/FooterHome";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { Link } from "next-translate-routes";
import Navbar2 from "../layout/headers/Navbar2";
import Top from "../layout/headers/Top";
import izgradnja from "../public/assets/images/izgradnja.svg";
import { Audio } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import Layout from "./layout";

const Naslovna = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      // Your code logic
    }, 250);
  }, []);

  return (
    <div className="komplet">
      <Top />
      <Navbar2 />
      <Container fluid className="pozadina">
        <h1
          style={{
            textAlign: "center",
            color: "var(--prva)",
            fontSize: "1.5rem",
            fontFamily: "Montserrat",
            fontWeight: 800,
            paddingTop: 30,
            textTransform: "uppercase",
          }}
        >
          {t("Odaberite uslugu koja vam je potrebna!")}
        </h1>
        <p className="wh-home-subtitle">
          {t("Prodaja i izdavanje nekretnina u Crnoj Gori na jednom mjestu.")}
        </p>
        <div className="wh-home-actions">
          <Link href="/nekretnine/sve-nekretnine" className="btn btn-gradient btn-pill">{t("Sve nekretnine")}</Link>
          <Link href="/nekretnine/objavi-nekretninu" className="btn btn-dashed btn-pill">{t("Objavi nekretninu")}</Link>
        </div>
        <Container className="card-container">
          <Row className="red">
            <Col className="kartica" lg={4} xs={12}>
              <Link href="nekretnine" className="link">
                <div className="card karttica">
                  <img className="slicica" src="assets/images//nekretnine.svg" />

                  <div
                    className="card__background"
                    style={{ backgroundImage: `url(/assets/images/nekretnine.jpg)` }}
                  ></div>
                  <div className="card__content">
                    <p className="card__category">White Homes</p>
                    <h3 className="card__heading">{t("Nekretnine")}</h3>
                  </div>
                </div>
              </Link>
            </Col>
            <Col className="kartica" lg={4} xs={12}>
              <Link href="Izdavanje-apartmana">
                <div className="card karttica">
                  <FontAwesomeIcon
                    className="slicica"
                    style={{ fonstSize: "65px", color: "white" }}
                    icon={faBook}
                  />

                  <div
                    className="card__background"
                    style={{ backgroundImage: `url(/assets/images/apartmani.jpg)` }}
                  ></div>
                  <div className="card__content">
                    <p className="card__category">White Homes</p>
                    <h3 className="card__heading">
                      {t("Kratkoročno izdavanje apartmana")}
                    </h3>
                  </div>
                </div>
              </Link>
            </Col>
            <Col className="kartica" lg={4} xs={12}>
              <Link href="generalno-ciscenje">
                <div className="card karttica">
                  <FontAwesomeIcon
                    className="slicica"
                    style={{ fonstSize: "65px", color: "white" }}
                    icon={faBroom}
                  />
                  <div
                    className="card__background"
                    style={{ backgroundImage: `url(/assets/images/ciscenje.webp)` }}
                  ></div>
                  <div className="card__content">
                    <p className="card__category">White Homes</p>
                    <h3 className="card__heading">
                      {t("Profesionalno čišćenje i održavanje")}
                    </h3>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          <h4
            style={{
              textAlign: "center",
              color: "var(--druga)",
              paddingBottom: 50,
              marginBottom: 0,
            }}
          ></h4>
        </Container>
      </Container>
      <FooterHome />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

Naslovna.getLayout = function getLayout(page) {
  return (
    <Layout
      name="Kontakt - Agencija za nekretnine White Homes"
      title="Naslovna - White Homes - Nekretnine - Izdavanje apartmana - O"
      description="Bez obzira da li tražite nekretninu za investiciju, stanovanje ili odmor, White Homes će vam pomoći da pronađete idealnu nekretninu za vaše potrebe..Dugogodišnje iskustvo i stručni tim, garantuje profesionalnu etiku i apsolutno zadovoljstvo klijenata."
    >
      {page}
    </Layout>
  );
};

export default Naslovna;
