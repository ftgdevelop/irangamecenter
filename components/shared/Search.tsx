import Image from "next/image";

const Search = () => {
    return (
        <div className="p-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="جستجو"
                    className="w-full h-14 border-none outline-none rounded-full bg-white/10 px-5 pr-16"
                />
                <button
                    type="submit"
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                >
                    <Image src="/images/icons/search.svg" alt="search" className="" width={30} height={30} />
                </button>
            </div>
        </div>
    )
}

export default Search;