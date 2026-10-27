/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { LatestProperties, Latest } from "../../../constValues/constValues";
import PropertyBoxOne from "../../elements/propertyBoxs/PropertyBox";
import { useTranslation } from "next-i18next";
const SalePropertySection = ({ value, range }) => {
  const { t } = useTranslation("common");

  return (
    <section className='property-section'>
    <Container>
      <Row className='ratio_55'>
        <Col>
          <div className='title-1'>
            <span className='label label-gradient'>{t("Izdavanje")}</span>
            <h2>{t("Nekretnine za izdavanje")}</h2>
            <hr />
          </div>
          <Row className='property-2 column-space'>
            {value &&
              value.filter(data=>data.status==="Izdavanje").slice(0,6).map((data, i) => (
                <Col xl='4' md='6' className='wow fadeInUp' key={data.id_nekretnina}>
                  <PropertyBoxOne data={data} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default SalePropertySection;
