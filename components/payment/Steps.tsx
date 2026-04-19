type Key = "cart" | "checkout" | "payment" | "result";

type Props = {
    activeStepKey: Key;
};

const Steps: React.FC<Props> = props => {

    const items: {
        label: string;
        key: Key
    }[] = [
            {
                key: "cart",
                label: "سبد خرید",
            },
            {
                key: "checkout",
                label: "اطلاعات کاربر",
            },
            {
                key: "payment",
                label: "پرداخت",
            },
            {
                key: "result",
                label: "تایید سفارش"
            }
        ];

    return (
        <>
            <div className="p-4 max-lg:hidden" />
            <div className="max-lg:hidden border-t border-neutral-200 dark:border-white/15" />
            <div className="max-w-[1000px] mx-auto grid grid-cols-4 text-xs sm:text-sm font-medium text-center bg-[#dbe9ec] lg:bg-[#fafafa] dark:bg-[#192b39] dark:lg:bg-[#011425] px-4 lg:px-5">
                {items.map(item => (
                    <div
                        key={item.key}
                        className={`py-3 px-1 sm:px-2 whitespace-nowrap border-b-2 ${item.key === props.activeStepKey ? "text-[#aa3aff] border-[#aa3aff]" : "text-gray-800 dark:text-gray-400 border-transparent"}`}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <div className="max-lg:hidden border-b border-neutral-200 dark:border-white/15" />
            <div className="p-4 max-lg:hidden" />
        </>
    )
}

export default Steps;