import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import axios from "axios";
import { useDispatch } from "react-redux";
import TapToTop from "../layout/TapToTop";
import StoreOldData from "../utils/StoreOldData";
import { LoadingScreen } from "../components/Common/loader";
import { ucitajNekretnine } from "../redux-toolkit/nekretnine-redux/sveNekretnine";
import { ucitajNeodobreneNekretnine } from "../redux-toolkit/nekretnine-redux/neodobreneNekretnine";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setLoading(true);
    setError(false);

    axios.get("/api/nekretnine", { signal: controller.signal, timeout: 15000 })
      .then(({ data }) => {
        if (!active) return;
        if (!Array.isArray(data)) throw new Error("Neocekivan odgovor API-ja");
        dispatch(ucitajNekretnine(data.filter(item => Number(item.odobreno) === 1)));
        dispatch(ucitajNeodobreneNekretnine(data.filter(item => Number(item.odobreno) === 0)));
      })
      .catch(err => {
        if (!active) return;
        console.error("Ucitavanje nekretnina nije uspjelo:", err);
        setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [dispatch, retry]);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <main className="wh-error-state" role="alert">
        <h1>Nekretnine trenutno nijesu dostupne</h1>
        <p>Nijesmo uspjeli da učitamo podatke. Provjerite vezu i pokušajte ponovo.</p>
        <button type="button" className="btn btn-gradient" onClick={() => setRetry(value => value + 1)}>
          Pokušaj ponovo
        </button>
      </main>
    );
  }

  const page = children?.props || {};
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={page.description || "White Homes – nekretnine u Crnoj Gori."} />
        <meta name="author" content="Digital Artefakt" />
        <link rel="icon" href="/assets/images/favicon.png" type="image/x-icon" />
        <title>{page.title || "White Homes – nekretnine u Crnoj Gori"}</title>
      </Head>
      {children}
      <TapToTop />
      <StoreOldData />
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}
