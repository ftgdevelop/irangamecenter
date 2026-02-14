import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Trash from "@/components/icons/Trash";
import { WishListItemType } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: WishListItemType;
  onDelete: () => void;
};
const WishlistItem: React.FC<Props> = (props) => {
  const { product } = props.product;

  const productUrl = `/product/${product.slug}`;

  return (
    <div className="flex gap-3 border-b border-neutral-300 dark:border-white/15 pb-4 mb-4">
      <Image
        src={product.filePath || "/images/default-game.png"}
        alt={product.fileAltAttribute || product.name || ""}
        width={72}
        height={72}
        className="block w-18 h-18 rounded-2xl"
        title={product.fileTitleAttribute || product.name}
      />

      <div className="grow">
        <div className="min-h-18 pt-2">
          <h4 className="text-sm font-semibold mb-2"> {product.name || ""} </h4>
          <p className="mt-2 text-xs">
            {product.categories?.map((x) => x.name)?.join(", ")}
          </p>
        </div>
        <div className="flex gap-5">
          <Link
            prefetch={false}
            href={productUrl}
            className="text-xs text-white dark:text-[#ca54ff] bg-gradient-violet dark:bg-gradient-dark-violet w-full px-5 py-3 flex rounded-full justify-center gap-3"
          >
            مشاهده جزییات و خرید
            <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
          </Link>
          <button
            type="button"
            className="bg-neutral-400 dark:bg-[#0c2932] p-1 rounded-full h-10 w-10 shrink-0 flex justify-center items-center"
            onClick={props.onDelete}
          >
            <Trash className="w-6 h-6 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
