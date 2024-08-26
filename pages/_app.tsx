
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Template from "@/components/Template";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {

  

  return (
    <>

      <Layout title="Zeta App">
        
          <Component {...pageProps}
             />
        
      </Layout>

    </>
  )
}
