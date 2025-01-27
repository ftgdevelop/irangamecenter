export const toPersianDigits = (x: string) => {
    if (x) {
        const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

        for (var i = 0; i < 10; i++) {
            x = x.replaceAll(i.toString(), persianNumbers[i]);
        }
    }

    return x;
};

export const numberWithCommas = (x: number) => {
    if (x) {
        const y = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return toPersianDigits(y);
    } else {
        return "0";
    }
}