/* eslint-disable  @typescript-eslint/no-explicit-any */

import ShareIcon from "@/components/icons/ShareIcon";

type Props = {
  label?: string;
  buttonClassName?: string;
  iconClassName: string;
}
const Share : React.FC<Props> = props => {
    
  const shareHandle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '',
          text: '',
          url: window.location.href,
        });
        console.log('Page shared successfully');
      } catch (err:any) {
        console.error('Share failed:', err.message);
      }
    } else {
      alert('اشتراک‌ گذاری وب در مرورگر شما پشتیبانی نمی‌شود!');
    }
  };

    return(
        <button
            type="button"
            onClick={shareHandle}
            aria-label="اشتراک گذاری"
            className={props.buttonClassName || ""}
        >
            <ShareIcon className={props.iconClassName} />
            {props.label || "" }
        </button>
    )
}

export default Share;