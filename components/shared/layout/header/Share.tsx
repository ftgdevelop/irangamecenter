/* eslint-disable  @typescript-eslint/no-explicit-any */

import ShareIcon from "@/components/icons/ShareIcon";

const Share : React.FC = () => {
    
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
        >
            <ShareIcon className="w-8 h-8 fill-current" />

        </button>
    )
}

export default Share;