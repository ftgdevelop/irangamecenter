/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import { getUserWishlist, removeWishlist } from "@/actions/commerce";
import { WishListItemType } from "@/types/commerce";
import { useAppDispatch } from "@/hooks/use-store";
import { toPersianDigits } from "@/helpers";
import WishlistItem from "@/components/authentication/profile/wishlist/WishlistItem";
import { setHeaderParams } from "@/redux/pages";

const Wishlist: NextPage = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<WishListItemType[]>([]);
  const [fetchMode, setFetchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  
  const [deletedItemsId, setDeletedItemsId] = useState<number[]>([]);

  const [totalCount, setTotalCount] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem("Token");
      if (!userToken) return;

      const res: any = await getUserWishlist({
        skipCount: 0,
        maxResultCount: 10,
        token: userToken,
      });
      if (res?.data?.result) {
        setTotalCount(res.data.result.totalCount || 0);
        setProducts(res.data.result.items);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(
      setHeaderParams({
        headerParams: {
          title: "مورد علاقه ها",
        },
      }),
    );

    document.addEventListener("scroll", checkIsInView);
    window.addEventListener("resize", checkIsInView);

    return () => {
      dispatch(setHeaderParams({ headerParams: undefined }));
    };
  }, []);

  const loadMoreWrapper = useRef<HTMLDivElement>(null);

  const removeListener = () => {
    document.removeEventListener("scroll", checkIsInView);
    window.removeEventListener("resize", checkIsInView);
  };

  useEffect(() => {
    if (fetchMode) {
      if (products.length < 50 && page < 6) {
        addItems();
      } else {
        removeListener();
      }
    }
  }, [fetchMode, products.length]);

  const addItems = async () => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) return;

    if (totalCount && products.length >= totalCount) {
      removeListener();
      return;
    }
    setLoading(true);

    const productsResponse: any = await getUserWishlist({
      maxResultCount: 10,
      skipCount: page * 10,
      token: userToken,
    });

    if (productsResponse?.data?.result.items?.length) {
      setProducts(productsResponse.data.result.items);
      setProducts((prevProducts) => [
        ...prevProducts,
        ...productsResponse.data.result.items,
      ]);
      setPage((p) => p + 1);
    } else {
      removeListener();
    }

    setLoading(false);
    setFetchMode(false);
  };

  const checkIsInView = () => {
    const targetTop = loadMoreWrapper.current?.getBoundingClientRect().top;
    const screenHeight = screen.height;
    if (targetTop && targetTop < (3 * screenHeight) / 5 && !fetchMode) {
      setFetchMode(true);
    }
  };

const deleteItem = async (productId: number) => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) return;

    const response :any = await removeWishlist({
        productId: productId,
    }, userToken);
    
    if(response.data?.success){
        setDeletedItemsId(ids => [...ids, productId]);
    }
};


  return (
    <div className="px-4 mb-12">
      <div className="border-b border-neutral-300 dark:border-white/15 pb-3 mb-4 text-left text-xs text-[#ca54ff]">
        {!!totalCount && `${toPersianDigits(totalCount.toString())} محصول`}
      </div>

      {products?.filter(x => !deletedItemsId.includes(x.product.id))?.map((item) => (
        <WishlistItem 
            key={item.id}
            product={item} 
            onDelete={() => {deleteItem(item.product.id)}}
        />
      ))}

      {!!loading &&
        [1, 2, 3, 4, 5].map((item) => (
          <div className="flex gap-3 mb-4" key={item}>
            <Skeleton
              dark
              type="image"
              className="w-18 h-18 block shrink-0 rounded-2xl"
            />
            <div className="w-full">
              <Skeleton className="h-4 w-full mt-2 mb-4" dark />
              <Skeleton className="w-1/2" dark />
            </div>
          </div>
        ))}

      {!!(totalCount && products.length < totalCount) && (
        <div ref={loadMoreWrapper} className="h-40" />
      )}
    </div>
  );
};
export default Wishlist;
