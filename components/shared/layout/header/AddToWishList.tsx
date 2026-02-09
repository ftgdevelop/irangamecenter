import Heart from "@/components/icons/Heart";

type Props = {
    productId : number;
}

const AddToWishList : React.FC<Props> = props => {

    const addToWishList = async () => {
        console.log(props.productId);
    }

    return(
        <>
            <button
                type="button"
                className="inline-flex items-center gap-3"
                onClick = {addToWishList}
            >
                <Heart className="w-6 h-6 fill-current" />
                اضافه به علاقه مندی
            </button>
        </>
    )
}

export default AddToWishList;