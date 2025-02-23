export const validateMobileNumberId = ({value,expectedLength ,reqiredMessage, invalidMessage }:{value: string,expectedLength?:number, reqiredMessage: string, invalidMessage: string}) => {
    let error;
    if (!value && reqiredMessage) {
        error = reqiredMessage;
    } else if (
        !/^[+0123456789۰۱۲۳۴۵۶۷۸۹]*$/.test(value)
        ||
        (expectedLength && value.replace("+","").length !== expectedLength)
        || 
        (!expectedLength && value.length < 10)
        ) {
        error = invalidMessage;
    }

    return error;
}
