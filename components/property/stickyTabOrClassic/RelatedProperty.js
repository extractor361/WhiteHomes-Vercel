/**
 * It takes an array of objects, and returns a new array of objects with the same keys, but with the
 * values transformed by the function you pass in
 * @returns The data is being returned as an array of objects.
 */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next-translate-routes";
import { getData } from "../../../utils/getData";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";
import { useSelector } from "react-redux";
const RelatedProperty = () => {
  const router=useRouter();
  const [value, setValue] = useState();
  let [povezane,posatviPovezane]=useState();
const nekretnine=useSelector(state=>state.nekretnine.niz);
const [query,postaviQuery]=useState(null);
const [related,postaviRelated]=useState([]);
const [nekretnina,postaviNekretninu]=useState();

useEffect(()=>{
  postaviQuery(router.query.nekretnina);

},[router.query.nekretnina])
const kreirajRelated = () => {
  if (!nekretnina) return;
  const alternatives = nekretnine
    .filter(item => item && item.id_nekretnina !== nekretnina.id_nekretnina)
    .map(item => ({
      ...item,
      similarity: Number(item.grad === nekretnina.grad) * 3 +
        Number(item.tip === nekretnina.tip) * 2 +
        Number(item.status === nekretnina.status),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);
  postaviRelated(alternatives);
};
useEffect(()=>{if(nekretnine.length!=0 && query!=null){postaviNekretninu(nekretnine.filter(x=>x.id_nekretnina==query)[0])}},[nekretnine,query])
useEffect(()=>{
  if(nekretnina!=null){console.log(nekretnina);
    kreirajRelated();}
},[nekretnina])

  return (
    <section className="property-section pt-0">
      <Container>
        <div className="title-3 text-start inner-title">
          <h2>Povezane nekretnine</h2>
        </div>
        <Row className=" ratio_55">
          <Col sm="12" className=" property-grid-3">
            <Row className="property-2  column-sm zoom-gallery property-label property-grid">
              {related.length > 0 &&
                related.map((data, i) => (
                  <Col xl="4" md="6" className="wow fadeInUp" key={data.id_nekretnina}>
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

export default RelatedProperty;
