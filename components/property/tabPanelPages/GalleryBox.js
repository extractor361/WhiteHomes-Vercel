import React from "react";
import { Col, Row } from "reactstrap";
import GallerySlider from "../stickyTabOrClassic/GallerySlider";

const GalleryBox = ({ naslovnaSlika }) => (
  <Row>
    <Col sm="12">
      <div className="single-gallery mb-4">
        <GallerySlider naslovnaSlika={naslovnaSlika} />
      </div>
    </Col>
  </Row>
);
export default GalleryBox;
