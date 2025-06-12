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
        return toPersianDigits("0");
    }
}

export const dateDiplayFormat = ({ date, format, locale }: { date: string; format?: "weekDayNumber" | "m" | "d" | "HH:mm"|"HH:mm:ss"| "dd mm"| "ddd dd mm"| "ddd dd mm yyyy" | "dd mm yyyy" | "yyyy/mm/dd" | "YYYY-MM-DD" | "yyyy/mm/dd h:m" | "yyyy MMM" , locale?: string }): string => {

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

    if (format === "yyyy MMM"){
        return(`${month} ماه ${year}`)
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


const number3digitsToLeters = (number: number) => {
    
    const a = Math.floor(number / 100);
    const remained = number % 100;
    const b = Math.floor(remained / 10);
    const c = Math.floor(number % 10);

    let A: string = "";

    switch (a) {
        case 1:
            A = "صد";
            break;
        case 2:
            A = "دویست";
            break;
        case 3:
            A = "سیصد";
            break;
        case 4:
            A = "چهارصد";
            break;
        case 5:
            A = "پانصد";
            break;
        case 6:
            A = "ششصد";
            break;
        case 7:
            A = "هفتصد";
            break;
        case 8:
            A = "هشتصد";
            break;
        case 9:
            A = "نهصد";
            break;
        default:
            A = "";
    }

    let B: string = "";

    switch (b) {
        case 1:
            switch (c) {
                case 1:
                    B = "یازده";
                    break;
                case 2:
                    B = "دوازده";
                    break;
                case 3:
                    B = "سیزده";
                    break;
                case 4:
                    B = "چهارده";
                    break;
                case 5:
                    B = "پانزده";
                    break;
                case 6:
                    B = "شانزده";
                    break;
                case 7:
                    B = "هفده";
                    break;
                case 8:
                    B = "هجده";
                    break;
                case 9:
                    B = "نوزده";
                    break;
                case 0:
                    B = "ده";
                    break;
                default:
                    B = "ده";
            }
            break;
        case 2:
            B = "بیست";
            break;
        case 3:
            B = "سی";
            break;
        case 4:
            B = "چهل";
            break;
        case 5:
            B = "پنجاه";
            break;
        case 6:
            B = "شصت";
            break;
        case 7:
            B = "هفتاد";
            break;
        case 8:
            B = "هشتاد";
            break;
        case 9:
            B = "نود";
            break;
        default:
            B = "";
    }

    let C: string = "";

    if (b !== 1) {
        switch (c) {
            case 1:
                C = "یک";
                break;
            case 2:
                C = "دو";
                break;
            case 3:
                C = "سه";
                break;
            case 4:
                C = "چهار";
                break;
            case 5:
                C = "پنج";
                break;
            case 6:
                C = "شش";
                break;
            case 7:
                C = "هفت";
                break;
            case 8:
                C = "هشت";
                break;
            case 9:
                C = "نه";
                break;
            default:
                C = "";
        }
    }

    const resultArray = [];

    if (A) {
        resultArray.push(A);
    }
    if (B) {
        resultArray.push(B);
    }
    if (C) {
        resultArray.push(C);
    }

    const result = resultArray.join(" و ");

    return result;

}

export const rialsToLettersToman = (number: number) => {
    const n = number / 10;
    if (n < 1) {
        return 0;
    }
    if (n >= 1000000000) {
        return numberWithCommas(n) + " تومان";
    }

    const milions = Math.floor(n / 1000000);
    const milionRemained = n % 1000000;
    const thousands = Math.floor(milionRemained / 1000);
    const thousandRemained = milionRemained % 1000;

    const Milions = milions ? number3digitsToLeters(milions) + " میلیون " : "";
    let Thousands: string;
    if (thousands === 1){
        Thousands = " هزار ";
    }else{
        Thousands = thousands ? number3digitsToLeters(thousands) + " هزار " : "";
    }
    const ThousandRemained = thousandRemained ? number3digitsToLeters(thousandRemained) : "";

    const resultArray = [];

    if (Milions) {
        resultArray.push(Milions);
    }
    if (Thousands) {
        resultArray.push(Thousands);
    }
    if (ThousandRemained) {
        resultArray.push(ThousandRemained);
    }
    const result = resultArray.join(" و ");

    return (result + " تومان");
}


export const  isWithinWorkingHours = () => {
  const now = new Date();

  const tehranTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  );

  const day = tehranTime.getDay();
  const hour = tehranTime.getHours();
  const minute = tehranTime.getMinutes();

  if (day === 5) {
    return false;
  }

  const currentMinutes = hour * 60 + minute;
  const startMinutes = 7 * 60 + 30; 
  const endMinutes = 19 * 60; 

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}
