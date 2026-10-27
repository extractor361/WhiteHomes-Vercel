/**
 * It takes in an array of objects and returns a slider with each object as a slide
 * @returns The FeatureSection component is being returned.
 */
import { Link } from "next-translate-routes";
import React from "react";
import Slider from "react-slick";
import { Featuredd} from "../../../constValues/constValues";
import { useTranslation } from "next-i18next";

import { Col, Container, Row } from "reactstrap";
import { Featured, FeaturedProperty } from "../../../constValues/constValues";
import { feature1 } from "../../../data/slickSlider";
import Img from "../../../utils/BackgroundImageRatio";
import NoSsr from "../../../utils/NoSsr";
import AddToWhishList from "../../elements/AddToWhishList";

const FeatureSection = ({ value }) => {
  const { t } = useTranslation("common");

  return (
    <section className="feature-section banner-4">
      <Container>
        <Row>
          <Col>
            <div className="title-1 text-white">
              <span className="label label-gradient">{t(Featuredd)}</span>
              <h2>{t(FeaturedProperty)}</h2>
              <hr />
            </div>
            <NoSsr>
              <Slider className="feature-1 arrow-light" {...feature1}>
                {value &&
                  value.filter(data => data && data.slika).slice(0, 8).map((data, i) => (
                    <div key={data.id_nekretnina}>
                      <div className="feature-wrapper">
                        <Row>
                          <Col xl="4" lg="3">
                            <div className="feature-left">
                              <div className="property-details">
                                <span className="font-roboto">{data.grad}</span>
                                <Link href={`/nekretnine/nekretnina/${data.id_nekretnina}`}>
                                  <h3 className="d-flex">
                                    {data.naziv}
                                    <span>
                                      <span className="label label-dark label-pill">{data.status}</span>
                                    </span>
                                  </h3>
                                </Link>
                                {data.cijena==0 ? <h6 style={{color:'orange'}}>Na upit</h6> : <h6>
                                €{new Intl.NumberFormat("de-DE").format(Number(data.cijena) || 0)}
            </h6> }


                                <p className="font-roboto wh-property-description">{data.opis}</p>
                                <ul>
            {data.spavace_sobe!=0 ? 
              <li>
                <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                {t("Spavaće sobe")} : {data.spavace_sobe}
              </li>:null}
              {data.kupatila!=0 ? <li>
                <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                {t("Kupatila")} : {data.kupatila}
              </li> : null}
              {data.povrsina && data.povrsina!=0 ? <li>
                <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                {t("Površina")} : {data.povrsina} m<sup>2</sup>
              </li> : null}
            </ul>
                                <a>
                                  <span className="round-half">
                                    <AddToWhishList id={data.id_nekretnina} />
                                  </span>
                                </a>
                                <div className="property-btn">
                                  <Link href={`/nekretnine/nekretnina/${data.id_nekretnina}`} className="btn btn-dashed btn-pill" tabIndex="0">
                                    {t("Detalji")}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl="8" lg="9" className="order-md">
                            <div className="feature-image">
                              <Img src={`/slike/${data.slika}`} className="bg-img" />
                              <h4>{data.tip}</h4>
                              <span className="box-color"></span>
                              <span className="signature">
                                <img src="/assets/images/signature/1.png" alt="" />
                              </span>
                              <span className="label label-white label-lg">{t(Featured)}</span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
              </Slider>
            </NoSsr>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeatureSection;
