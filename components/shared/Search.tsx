/* eslint-disable  @typescript-eslint/no-explicit-any */

import Image from "next/image";
import CloseSimple from "../icons/CloseSimple";
import { useEffect, useRef, useState } from "react";
import ModalPortal from "./layout/ModalPortal";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import ArrowRight from "../icons/ArrowRight";
import axios from "axios";
import { Commerce, ServerAddress } from "@/enum/url";
import { ProductItem } from "@/types/commerce";
import { setReduxError } from "@/redux/errorSlice";
import Link from "next/link";
import { toPersianDigits } from "@/helpers";
import Skeleton from "./Skeleton";

const Search = () => {

    const min = 3;

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [slideIn, setSlideIn] = useState<boolean>(false);

    const [products, setProducts] = useState<ProductItem[]>([]);

    const [errorText, setErrorText] = useState<string>("");

    const [text, setText] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setSlideIn(true);
            searchInputRef.current?.focus();
            dispatch(setBodyScrollable(false));
            dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!slideIn) {
            setText("");
            setTimeout(() => { setOpen(false) }, 300)
        }
    }, [slideIn]);

    const searchInputRef = useRef<HTMLInputElement>(null)

    const source = axios.CancelToken.source();

    const fetchData = async (val: string) => {
        setLoading(true);
        setErrorText("");

        try {

            const axiosParams = {
                method: "post",
                url: `${ServerAddress.Type}${ServerAddress.Commerce}${Commerce.GetAllProducts}`,
                cancelToken: source.token,
                data: {
                    maxResultCount: 30,
                    skipCount: 0,
                    search: val
                }
            }

            const response = await axios(axiosParams);

            if (response?.data?.result?.pagedResult?.items?.length) {
                setProducts(response.data.result.pagedResult.items);
            } else {
                setProducts([]);
                setErrorText("نتیجه ای یافت نشد");
            }

        } catch (error: any) {
            if (error.message && error.message !== "canceled") {
                dispatch(setReduxError({
                    title: "خطا",
                    message: error.message,
                    isVisible: true
                }))
            }

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        setProducts([]);
        setErrorText("");

        let fetchTimeout: ReturnType<typeof setTimeout>;

        if (text.length >= min) {
            fetchTimeout = setTimeout(() => { fetchData(text) }, 300);
        }

        return () => {
            clearTimeout(fetchTimeout);
            if (source) {
                source.cancel("canceled");
            }
        }

    }, [text]);

    return (
        <>
            <button
                onClick={() => { setOpen(true); }}
                type="button"
                name="text"
                className="w-full h-14 border-none outline-none rounded-full bg-white/10 px-4 flex items-center gap-3 text-[#bbbbbb]"
            >
                <Image src="/images/icons/search.svg" alt="search" className="" width={30} height={30} />
                جستجو
            </button>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                    <div className="relative w-full md:max-w-lg md:mx-auto h-screen">

                        <div className={`flex flex-col gap-4 p-5 py-7 bg-[#192a39] text-white absolute transition-all left-0 right-0 min-h-screen ${slideIn ? "opacity-100" : "opacity-0"}`}>

                            <div className='relative' >
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="text"
                                    ref={searchInputRef}
                                    placeholder="جستجو"
                                    onChange={e => { setText(e.target.value) }}
                                    value={text}
                                    className="w-full h-14 border-none outline-none rounded-full text-sm bg-white/10 px-5 pr-14"
                                />
                                <button
                                    type="submit"
                                    className="absolute top-1/2 right-4 -translate-y-1/2"
                                    onClick={() => { setSlideIn(false) }}
                                >
                                    <ArrowRight className="w-7 h-7 fill-current" />
                                </button>

                                {!!text.length && <button
                                    type="button"
                                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 rounded-full p-1"
                                    onClick={() => {
                                        setText("");
                                        searchInputRef.current?.focus();
                                    }}
                                >
                                    <CloseSimple className="fill-white w-4 h-4" />
                                </button>}

                            </div>

                            <div className="bg-white/10 rounded-3xl py-5 px-2 grow">
                                {text.length ? (
                                    <div className="flex gap-4 mx-4 items-center border-b border-white/30 pb-5 text-xs">
                                        <Image src="/images/icons/search.svg" alt="search" className="" width={30} height={30} />
                                        <span> جستجوی “{text}” </span>
                                    </div>
                                ) : null
                                }

                                <div className="search-result-max-h styled-scrollbar overflow-auto px-3">
                                    {loading ? (
                                        [1, 2, 3, 4, 5].map(item => (
                                            <div className="flex gap-3 items-center border-b border-white/30 py-3" key={item}>
                                                <Skeleton
                                                    dark
                                                    type="image"
                                                    className="w-18 h-18 block shrink-0 rounded-2xl"
                                                />
                                                <Skeleton className="h-4 w-full" dark />
                                            </div>
                                        ))
                                    ) : errorText ? (
                                        <div className="text-sm py-5"> {errorText} </div>
                                    ) : products.map(product => (
                                        <Link href={`/product/${product.slug}`} target="_blank" className="flex items-center gap-4 border-b border-white/30 py-3" >
                                            <Image
                                                src={product.filePath || "/images/default-game.png"}
                                                alt={product.fileAltAttribute || product.name || ""}
                                                width={72}
                                                height={72}
                                                className="block w-18 h-18 rounded-2xl"
                                                title={product.fileTitleAttribute || product.name}
                                            />
                                            <h4 className="text-xs mb-2"> {toPersianDigits(product.name || "")} </h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalPortal>

        </>
    )
}

export default Search;