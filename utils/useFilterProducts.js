import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

const useFilterProducts = ({ value }) => {
  const { status, tip,grad,  spavaceSobe, kupatila,  cijena, povrsina, sortirajPrema,pretraga } = useSelector((state) => state.inputsReducer);
  const inputFilter = useSelector((state) => state.inputsReducer);
  const {t}=useTranslation("common");

  const [showProduct, setShowProduct] = useState();
  const [work, setWork] = useState(false);
const [upit,postaviUpit]=useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  let Data = router.query;
    
  try {    console.log(inputFilter)

    var oldData = typeof Data.filtriraniPodaci === "string"
      ? JSON.parse(decodeURIComponent(Data.filtriraniPodaci)) : null;
    console.log(oldData)
  } catch (err) {
    console.log(err);
  }
  useEffect(() => {
    console.log(value)
    console.log(oldData)
    oldData?.status && dispatch({ type: "status", payload: t(oldData?.status) });
    oldData?.tip && dispatch({ type: "tip", payload: t(oldData?.tip) });
    oldData?.grad && dispatch({ type: "grad", payload: oldData?.grad });
    oldData?.spavaceSobe && dispatch({ type: "spavaceSobe", payload: oldData?.spavaceSobe });
    oldData?.kupatila && dispatch({ type: "kupatila", payload: oldData?.kupatila });
    oldData?.pretraga && dispatch({ type: "pretraga", payload: oldData?.pretraga });

    oldData?.sortirajPrema && dispatch({ type: "sortirajPrema", payload: oldData?.sortirajPrema });
    oldData?.cijena && (oldData?.cijena[0] !== cijena[0] || oldData?.cijena[1] !== cijena[1] ? dispatch({ type: "cijena", payload: oldData?.cijena }) : "");
    oldData?.povrsina && (oldData?.povrsina[0] !== povrsina[0] || oldData?.povrsina[1] !== povrsina[1] ? dispatch({ type: "povrsina", payload: oldData?.povrsina }) : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [Data]);

  useEffect(() => {
    console.log(value)
    

    setShowProduct(
      value
        ?.filter((product) => {
          let statuss = status ? (status === t("Status Nekretnine") && true) || (t(product.status) === status ? true : false) : true;
          let type = tip ? (tip === t("Tip Nekretnine") && true) || (t(product.tip) === tip ? true : false) : true;
          let gr = grad ? (grad === t("Grad") && true) || (t(product.grad) === grad ? true : false) : true;
          let term = String(pretraga || "").trim().toLocaleLowerCase();
          let pretragaa = !term || [product.naziv, product.adresa, product.grad, product.id_nekretnina]
            .some(field => String(field ?? "").toLocaleLowerCase().includes(term));

          let beds = spavaceSobe ? (spavaceSobe === t("Spavace Sobe") && true) || (product.spavace_sobe === Number(spavaceSobe) ? true : false) : true;
          let baths = kupatila ? (kupatila === "Kupatila" && true) || (product.kupatila === Number(kupatila) ? true : false) : true;
          let priceMatch = product.cijena!=0  ? cijena[0] <= product.cijena && cijena[1] >= product.cijena && true : true;
          let SqftMatch = povrsina ? povrsina[0] <= product.povrsina && povrsina[1] >= product.povrsina && true : true;

          return statuss && type && gr && beds && baths && pretragaa  && priceMatch && SqftMatch;
        })
        .sort((product1, product2) => {
          const price1 = Number(product1.cijena) || 0;
          const price2 = Number(product2.cijena) || 0;
          const dateValue = item => {
            const [day, month, year] = String(item.datum || "").split("/");
            return new Date(`${year}-${month}-${day}`).getTime() || 0;
          };
          if (sortirajPrema === "Cijena - Od više ka nižoj") return price2 - price1;
          if (sortirajPrema === "Cijena - Od niže ka višoj") return price1 - price2;
          if (sortirajPrema === "Datum - Najstariji") return dateValue(product1) - dateValue(product2);
          return dateValue(product2) - dateValue(product1);
        }),
    );

    work &&
      router.push(
        {
          pathname: router.pathname,
          query: { filtriraniPodaci: encodeURIComponent(JSON.stringify(inputFilter)) },
        },
        undefined,
        {
          shallow: true,
        },
      );
    setTimeout(() => {
      setWork(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, value, grad, tip, spavaceSobe, kupatila, sortirajPrema, pretraga, cijena, povrsina]);

  return showProduct;
};

export default useFilterProducts;
