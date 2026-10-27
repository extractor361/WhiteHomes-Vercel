import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ucitajNekretninu } from "../../../redux-toolkit/nekretnine-redux/izabranaNekretnina";
import BodyContent from "../../../components/property/tabPanelPages";
import Layout from "../layout";

// No localhost API calls during a Vercel build: each listing URL can be served immediately.
export const getServerSideProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale || "sr", ["common"])) },
});

const PropertyPage = () => {
  const router = useRouter();
  const id = router.query.nekretnina;
  const nekretnine = useSelector(state => state.nekretnine.niz);
  const selected = useSelector(state => state.izabranaNekretnina);
  const dispatch = useDispatch();
  const property = id && nekretnine.find(item => String(item.id_nekretnina) === String(id));

  useEffect(() => {
    if (property) dispatch(ucitajNekretninu(property));
  }, [dispatch, property]);

  if (!router.isReady || !id || (property && selected?.id_nekretnina !== property.id_nekretnina)) {
    return <div className="wh-property-feedback">Učitavanje detalja nekretnine...</div>;
  }

  if (!property) {
    return (
      <div className="wh-property-feedback">
        <h1>Nekretnina nije pronađena</h1>
        <p>Oglas možda više nije dostupan.</p>
        <a href="/nekretnine/sve-nekretnine" className="btn btn-gradient">Sve nekretnine</a>
      </div>
    );
  }

  return <BodyContent singleData={property} />;
};

PropertyPage.getLayout = function getLayout(page) {
  return <Layout title="Detalji nekretnine | White Homes" description="Pronađite detalje i fotografije nekretnina u Crnoj Gori.">{page}</Layout>;
};

export default PropertyPage;
