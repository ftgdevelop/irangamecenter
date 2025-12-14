/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";

const Orders: NextPage = () => {

  return (
    <div className="px-5 grid grid-cols-2 gap-5">
      در حال توسعه
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  return ({
    props: {
      context: {
        locales: context.locales || null
      },
    },
    revalidate: 3600
  })

}

export default Orders;