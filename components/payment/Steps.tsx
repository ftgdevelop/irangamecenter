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
        <div className="flex justify-between text-sm font-medium text-center text-gray-500 bg-[#192b39] dark:text-gray-400 px-4">
            {items.map(item => (
                <div
                    key={item.key}
                    className={`py-3 px-2 border-b-2 ${item.key === props.activeStepKey ? "text-[#aa3aff] border-[#aa3aff]" : "text-gray-400 border-transparent"}`}
                >
                    {item.label}
                </div>
            ))}
        </div>
    )
}

export default Steps;