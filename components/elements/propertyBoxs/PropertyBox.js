import React from "react";
import { Link } from "next-translate-routes";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import ImageSlider from "../ImageSlider";
import PropertyLabel from "../PropertyLabel";

const PropertyBox = ({ data, relativeSlider }) => {
  const { t } = useTranslation("common");
  const { symbol, currencyValue } = useSelector(state => state.currencyReducer);
  if (!data) return null;

  const href = `/nekretnine/nekretnina/${data.id_nekretnina}`;
  const price = Number(data.cijena);
  const amount = Number.isFinite(price) ? price * (Number(currencyValue) || 1) : null;
  const formattedPrice = amount !== null && price > 0
    ? `${symbol || "€"}${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(amount)}`
    : t("Na upit");

  return (
    <article className="property-box wh-property-card">
      <div className="property-image">
        <ImageSlider images={data.slika} />
        <div className="labels-left">
          <PropertyLabel labelStatus={t(data.status)} labelType={t(data.tip)} />
        </div>
      </div>
      <div className="property-details">
        <span className="font-roboto wh-location">{data.grad || "Crna Gora"}</span>
        <Link href={href}><h3>{data.naziv}</h3></Link>
        <h6 className="wh-property-price">{formattedPrice}</h6>
        {data.opis && <p className="font-roboto wh-property-description">{data.opis}</p>}
        <ul>
          {Number(data.spavace_sobe) > 0 && (
            <li><img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
              {t("Spavaće sobe")}: {data.spavace_sobe}</li>
          )}
          {Number(data.kupatila) > 0 && (
            <li><img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
              {t("Kupatila")}: {data.kupatila}</li>
          )}
          {Number(data.povrsina) > 0 && (
            <li><img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
              {t("Površina")}: {data.povrsina} m²</li>
          )}
        </ul>
        <div className="property-btn d-flex wh-card-footer">
          <span>{data.datum || ""}</span>
          <Link href={href} className="btn btn-dashed btn-pill">{t("Detalji")}</Link>
        </div>
      </div>
    </article>
  );
};
export default React.memo(PropertyBox);
