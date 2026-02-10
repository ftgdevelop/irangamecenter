import { addToWishlist, existInWishlist } from "@/actions/commerce";
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
      const response = await existInWishlist({
        productId: props.productId,
        token: userToken,
      });
      console.log(response);
      setLoading(false);
    };

    checkLikeStatus();
  }, []);

  const addToWishList = async () => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) return;

    setLoading(true);
    const response = await addToWishlist({
      token: userToken,
      productId: props.productId,
    });

    console.log(response);
    setLoading(false);

    debugger;

    console.log(props.productId);
    setActive((state) => !state);
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-3"
        onClick={addToWishList}
      >
        {loading ? (
          <Loading className="w-7 h-7 fill-current animate-spin" />
        ) : (<LikeIcon
          className={`w-7 h-7 stroke-2 transition-all ${active ? "fill-red-500 stroke-red-500" : "stroke-neutral-800 dark:stroke-white fill-transparent"}`}
        />)}
        اضافه به علاقه مندی ها
      </button>
    </>
  );
};

export default AddToWishList;
