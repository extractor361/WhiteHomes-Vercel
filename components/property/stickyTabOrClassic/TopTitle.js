import React, { useState } from "react";
import { Facebook, Instagram, Printer, Twitter } from "react-feather";
import { Container } from "reactstrap";
import ReviewStarr from "../../elements/ReviewStarr";
import { useTranslation } from "next-i18next";
const TopTitle = ({ singleData }) => {
  const { t } = useTranslation("common");

  console.log(singleData)
  const [like, setLike] = useState(false);
  return (
    <div className="single-property-section">
      <Container>
        <div className="single-title">
          <div className="left-single">
            <div className="d-flex">
              <h2 className="mb-0">{singleData?.naziv || "Orchard House"}</h2>
              <span>
                <span style={{margin:5}} className="label label-shadow ms-2">{t(singleData?.status)}</span>
                <span style={{margin:5}} className="label label-solid ms-2">{t(singleData?.tip)}</span>

              </span>
            </div>
            <p className="mt-1">{singleData?.adresa}</p>
            <ul>
              <li>
                <div>
                  <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                  <span>{singleData?.spavace_sobe } {t("Spavaćih Soba")}</span>
                </div>
              </li>
              {singleData?.kupatila ?<li>
                <div>
                  <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                 <span>{singleData.kupatila } {t("Kupatila")}</span> 
                </div>
              </li> : null }
              
              {singleData?.povrsina ? <li>
                <div>
                  <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                  <span>{singleData.povrsina} m<sup>2</sup></span>
                </div>
              </li> : null}
             
            </ul>
            <div className="wh-contact-actions">
              <a className="btn btn-gradient btn-pill" href="tel:+38267201391">{t("Pozovi")}</a>
              <a className="btn btn-dashed btn-pill" href={`mailto:office@whitehomes.com?subject=${encodeURIComponent(`Upit za nekretninu #${singleData?.id_nekretnina || ""}`)}`}>{t("Pošalji upit")}</a>
            </div>
            <div className="share-buttons">
              <div className="d-inline-block">
                <a className="btn btn-gradient btn-pill">
                  <i className="fas fa-share-square"></i>
                  {t("Podijeli")}
                </a>
                <div className="share-hover">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/" className="icon-facebook" target="_blank" rel="noreferrer">
                        <Facebook></Facebook>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" className="icon-twitter" target="_blank" rel="noreferrer">
                        <Twitter></Twitter>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank" className="icon-instagram" rel="noreferrer">
                        <Instagram></Instagram>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/*<a className="btn btn-dashed btn-pill ms-md-2 ms-1 save-btn" onClick={() => setLike(!like)}>
                <i className={`${like ? "fas" : "far"} fa-heart`}></i>
                Sačuvaj
              </a>*/}
              <a className="btn btn-dashed btn-pill ms-md-2 ms-1" onClick={() => window.print()}>
                <Printer />
               {t("Printaj")}

              </a>
            </div>
          </div>
          <div className="right-single">
            {/*<ReviewStarr rating={4} />*/}
            <h2 className="price">
            {singleData?.cijena!=0 ? "€"+singleData.cijena : <h2 style={{color:"orange"}}>{t("Na upit")}</h2>} <span>{t("Cijena")}</span>
            </h2>
           
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopTitle;
