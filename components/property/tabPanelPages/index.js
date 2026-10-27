/**
 * It returns the children of the component, the top title, the image section, the gallery box, the
 * single property section, the reviews desk box, the contact info, the exploration, the filter, the
 * featured, the recently added, the mortgage, and the related property
 * @param props - {
 * @returns A React component.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import TopTitle from "../stickyTabOrClassic/TopTitle";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
import RelatedProperty from "../stickyTabOrClassic/RelatedProperty";
import GalleryBox from "./GalleryBox";
import ImageSection from "./Image";
import SinglePropertySection from "./SinglePropertySection";
import { useSelector } from "react-redux";
const BodyContent = (props) => {
  let nekretnine=useSelector(state=>state.nekretnine.niz)
  return (
    <>
      {props.children}
      <section className="without-top property-main small-section">
        <TopTitle singleData={props.singleData} />
      </section>
      <section className="single-property mt-0 pt-0">
        <Container>
          <Row className=" ratio_55">
            <Col xl="9" lg="8">
              <div className="description-section tab-description">
                {props.imgSection && <ImageSection />}
                <GalleryBox naslovnaSlika={props.singleData?.slika} />
                <SinglePropertySection />
              </div>
            </Col>
            <Sidebar>
              <ContactInfo />
              <Filter />
              {nekretnine.length!=0 ? <Featured data={nekretnine}/> : null}
              {/*<RecentlyAdded />*/}
            </Sidebar>
          </Row>
        </Container>
        <div className="related-abjust">
          <RelatedProperty />
        </div>
      </section>
    </>
  );
};

export default BodyContent;
