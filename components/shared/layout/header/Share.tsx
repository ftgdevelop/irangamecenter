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
      <div className="relative group flex items-center justify-start lg:justify-center">
        <button
            type="button"
            onClick={shareHandle}
            aria-label="اشتراک گذاری"
            className={props.buttonClassName || ""}
        >
            <ShareIcon className={props.iconClassName} />
            <span className="lg:hidden">
              {props.label}
            </span>
        </button>
        <div className="max-lg:hidden opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible absolute right-full top-1/2 -translate-y-1/2 text-xs bg-white/70 p-3 whitespace-nowrap text-black rounded-lg mr-2 group-hover:mr-1 transition-all">
          {props.label}
        </div>         
      </div>
    )
}

export default Share;