/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import CloseSimple from "../icons/CloseSimple";
import { useRef } from "react";

const Search = () => {

    const router = useRouter();

    const { query } = router;

    const searchedText = query.query as string;

    const searchInputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (values: any) => {
        if (values.text) {
            router.push(`/search?query=${values.text}`)
        }
    }

    return (
        <div className="p-3">

            <Formik
                validate={() => { return {} }}
                initialValues={{ text: searchedText || "" }}
                onSubmit={submitHandler}
            >
                {({ setFieldValue, values }) => {
                    return (

                        <Form className='relative' autoComplete='off' >
                            <Field
                                type="text"
                                name="text"
                                ref={searchInputRef}
                                placeholder="جستجو"
                                className="w-full h-14 border-none outline-none rounded-full bg-white/10 px-5 pr-16"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-4 -translate-y-1/2"
                            >
                                <Image src="/images/icons/search.svg" alt="search" className="" width={30} height={30} />
                            </button>

                            {values.text && <button
                                type="button"
                                className="absolute top-1/2 left-4 -translate-y-1/2"
                                onClick={() => {
                                    setFieldValue("text", "");
                                    searchInputRef.current?.focus();
                                }}
                            >
                                <CloseSimple className="fill-white w-8 h-8" />
                            </button>}

                        </Form>
                    )
                }}
            </Formik>

        </div>
    )
}

export default Search;