import { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Components/Layouts/Layout";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import "react-medium-image-zoom/dist/styles.css";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Turn on only after first paint (hydration-safe)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // nothing on first server render

  return (
    <>
      <NextNProgress
        height={5}
        color="linear-gradient(to right, #00c6ff, #0072ff)"
        options={{ easing: "ease", speed: 500, showSpinner: false }}
      />
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  );
}

export default MyApp;