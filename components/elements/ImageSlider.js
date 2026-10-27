import React from "react";
import Slider from "react-slick";
import { propertySlider } from "../../data/slickSlider";
import Img from "../../utils/BackgroundImageRatio";
import NoSsr from "../../utils/NoSsr";

const imagePath = (value) => {
  const name = typeof value === "string" ? value : value?.slika;
  if (!name) return "/assets/images/property/4.jpg";
  if (/^https?:\/\//i.test(name) || name.startsWith("/slike/")) return name;
  return `/slike/${String(name).replace(/^\/+/, "")}`;
};

const ImageSlider = ({ images }) => {
  const sources = (Array.isArray(images) ? images : [images])
    .filter(Boolean)
    .map(imagePath);
  if (!sources.length) sources.push("/assets/images/property/4.jpg");

  return (
    <NoSsr>
      <Slider className="property-slider" {...propertySlider} infinite={sources.length > 1} arrows={sources.length > 1} dots={sources.length > 1}>
        {sources.map((src, index) => (
          <div key={src + index}>
            <div className="wh-property-photo">
              <Img src={src} loading="lazy" alt={`Fotografija nekretnine ${index + 1}`} className="bg-img" />
            </div>
          </div>
        ))}
      </Slider>
    </NoSsr>
  );
};
export default ImageSlider;
