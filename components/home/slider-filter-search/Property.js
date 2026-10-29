/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { LatestForSale, Rent } from "../../../constValues/constValues";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";
import { useTranslation } from "next-i18next";
const PropertySection = ({ value, range }) => {
  const { t } = useTranslation("common");

  // The API does not guarantee the listing order. The highest listing ID
  // is the most recently created listing (editing does not change its ID).
  const latestProperties = Array.isArray(value)
    ? [...value].sort((a, b) => Number(b.id_nekretnina) - Number(a.id_nekretnina)).slice(0, 6)
    : [];

  return (
    <section className='property-section'>
      <Container>
        <Row className='ratio_55'>
          <Col>
            <div className='title-1'>
              <span className='label label-gradient'>{t("Poslednje")}</span>
              <h2>{t("Poslednje nekretnine")}</h2>
              <hr />
            </div>
            <Row className='property-2 column-space'>
              {latestProperties.map((data) => (
                  <Col xl='4' md='6' className='wow fadeInUp' key={data.id_nekretnina}>
                    <PropertyBox data={data} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertySection;
