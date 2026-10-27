import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { galleryFor, galleryNav } from "../../../data/slickSlider";
import Img from "../../../utils/BackgroundImageRatio";
import NoSsr from "../../../utils/NoSsr";
import { useRouter } from "next/router";
import axios from "axios";

const GallerySlider = ({ naslovnaSlika }) => {
  const router = useRouter();
  const id = router.query.nekretnina;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    axios.post("/api/galerija", { id }, { timeout: 12000 })
      .then(({ data }) => {
        if (!active) return;
        setImages(Array.isArray(data) ? data.map(item => item.slika).filter(Boolean) : []);
      })
      .catch(error => {
        if (!active) return;
        console.error("Galerija nije dostupna:", error);
        setImages([]);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  // The listing's selected cover photo must be the first gallery slide, even
  // when the gallery endpoint returns the photos in a different order.
  // Normalize image paths so the cover is not repeated if already in the gallery.
  const imageKey = name => String(name).trim()
    .split(/[?#]/)[0]
    .replace(/^https?:\\/\\/[^/]+/i, "")
    .replace(/^\\/*(?:slike\\/)?/i, "");

  const seen = new Set();
  const gallery = [naslovnaSlika, ...images].filter(name => {
    if (typeof name !== "string" || !name.trim()) return false;
    const key = imageKey(name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (loading) return <div className="wh-gallery-placeholder">Učitavanje fotografija...</div>;
  if (!gallery.length) return <div className="wh-gallery-placeholder">Fotografije nijesu dostupne.</div>;

  const photoUrl = name => /^https?:\/\//i.test(name) || name.startsWith("/slike/")
    ? name : `/slike/${name}`;

  return (
    <NoSsr>
      <Slider className="gallery-for" {...galleryFor} infinite={gallery.length > 1} asNavFor={nav2} ref={setNav1}>
        {gallery.map((name, i) => (
          <div key={name + i}>
            <div className="wh-detail-photo">
              <Img src={photoUrl(name)} className="bg-img" alt={`Fotografija nekretnine ${i + 1}`} />
            </div>
          </div>
        ))}
      </Slider>
      {gallery.length > 1 && (
        <Slider className="gallery-nav p-1" {...galleryNav} asNavFor={nav1} ref={setNav2}>
          {gallery.map((name, i) => (
            <div key={name + i}>
              <div className="wh-gallery-thumb">
                <Img src={photoUrl(name)} className="img-fluid bg-img" alt={`Fotografija ${i + 1}`} />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </NoSsr>
  );
};
export default GallerySlider;
