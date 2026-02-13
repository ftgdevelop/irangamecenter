/* eslint-disable  @typescript-eslint/no-explicit-any */

import { addToWishlist, existInWishlist, removeWishlist } from "@/actions/commerce";
import LikeIcon from "@/components/icons/LikeIcon";
import Loading from "@/components/icons/Loading";
import { useEffect, useState } from "react";

type Props = {
  productId: number;
};

const AddToWishList: React.FC<Props> = (props) => {

  const [active, setActive] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      const userToken = localStorage.getItem("Token");
      if (!userToken) return;

      setLoading(true);
      const response: any = await existInWishlist({
        productId: props.productId,
        token: userToken,
      });
      if(response?.data?.result){
        setActive(true);
      }
      setLoading(false);
    };

    checkLikeStatus();
  }, []);


  const toggleWishlist = async () => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) return;

    setLoading(true);

    if(active){
      const response :any = await removeWishlist({
        productId: props.productId,
      }, userToken,);
      if(response.data?.success){
        setActive(false);
      }
    }else{
    const response :any = await addToWishlist({
      productId: props.productId,
    }, userToken,);
     if(response.data?.success){
       setActive(true);
     }
    }
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-3"
        onClick={toggleWishlist}
        disabled={loading}
      >
        {loading ? (
          <Loading className="w-7 h-7 fill-current animate-spin" />
        ) : (<LikeIcon
          className={`w-7 h-7 stroke-2 transition-all ${active ? "fill-red-500 stroke-red-500" : "stroke-neutral-800 dark:stroke-white fill-transparent"}`}
        />)}

        {active ? "حذف از علاقه مندی ها" : "اضافه به علاقه مندی ها"}
        
      </button>
    </>
  );
};

export default AddToWishList;
