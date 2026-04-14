/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <> 
        <Head>
        <title> تیکت های من </title>
      </Head>

      <div className="lg:max-w-[1000px] lg:mx-auto lg:py-10">
            <h3 className="text-[#ca54ff] font-bold text-sm mb-4 my-3">
              تیکت های من
            </h3>
            <div> در حال توسعه ... </div>
      </div>      
    </>
  );
}

export default Contact;
