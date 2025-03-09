export const toPersianDigits = (x: string) => {
    if (x) {
        const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

        for (let i = 0; i < 10; i++) {
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

export const dateDiplayFormat = ({ date, format, locale }: { date: string; format?: "weekDayNumber" | "m" | "d" | "HH:mm"|"HH:mm:ss"| "dd mm"| "ddd dd mm"| "ddd dd mm yyyy" | "dd mm yyyy" | "yyyy/mm/dd" | "YYYY-MM-DD" | "yyyy/mm/dd h:m" , locale?: string }): string => {

    if (!date) return "";

    const dateObject = new Date(date);
    const day = dateObject.toLocaleString(locale, { day: "numeric" });
    const weekDay = dateObject.toLocaleString(locale, { weekday: 'short' });
    const weekDayNumber = dateObject.getDay();
    const month = dateObject.toLocaleString(locale, { month: "long" });
    const day2digit = dateObject.toLocaleString(locale, { day: "2-digit" })
    const month2digit = dateObject.toLocaleString(locale, { month: "2-digit" });
    const year = dateObject.toLocaleString(locale, { year: "numeric" });

    const h = dateObject.getHours().toString().padStart(2, '0');
    const m = dateObject.getMinutes().toString().padStart(2, '0');

    if (format === "HH:mm"){
        const h1 = dateObject.toLocaleString(locale, { hour: "2-digit" }).padStart(2, '0');
        const m1 = dateObject.toLocaleString(locale, { minute: "2-digit" }).padStart(2, '0');
        return(h1+":"+m1);
    }
    if (format === "HH:mm:ss"){
        const h1 = dateObject.toLocaleString(locale, { hour: "2-digit" }).padStart(2, '0');
        const m1 = dateObject.toLocaleString(locale, { minute: "2-digit" }).padStart(2, '0');
        const s1 = dateObject.toLocaleString(locale, { second: "2-digit" }).padStart(2, '0');
        return(h1+":"+m1+":"+s1);
    }

    if (format === "ddd dd mm") {
        return (`${weekDay} ${day} ${month}`)
    }

    if (format === "dd mm yyyy") {
        return (`${day} ${month} ${year}`)
    }

    if (format === "yyyy/mm/dd") {
        return (`${year}/${month2digit}/${day2digit}`)
    }
    if (format === "YYYY-MM-DD") {
        return (`${year}-${month2digit}-${day2digit}`)
    }

    if (format === "yyyy/mm/dd h:m"){
        return (`${year}/${month2digit}/${day2digit} - ${h}:${m}`)
    }

    if (format === "dd mm"){
        return (`${day} ${month}`)
    }
    if (format === "d"){
        return (day2digit)
    }
    if (format === "m"){
        return (month)
    }

    if(format === "weekDayNumber"){
        return weekDayNumber.toString()
    }

    if (format === "ddd dd mm yyyy"){
        return (`${weekDay} ${day} ${month} ${year}`)
    }

    return date;
}

export const dateFormat = (date: Date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
}
export const addSomeDays = (date: Date, increment: number = 1) => {

    const newDate = new Date(date.getTime() + increment * 24 * 60 * 60 * 1000)

    return newDate;
}

export const goBackYears = (date: Date, years: number = 1) => {

    const newDate = new Date(date.getTime() - years * 365.25 * 24 * 60 * 60 * 1000);

    return newDate;
}

export const persianNumbersToEnglish = (number: string) => {

    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof number === 'string') {
        for (let i = 0; i < 10; i++) {
            number = number.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
        }
    }
    return number;
}
