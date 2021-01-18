export const minLength = (value, min) => value.length > min;
export const maxLength = (value, max) => value.length < max;
export const rangeLength = (value, min, max) => value.length > min && value.length < max;

export const phoneNumberRegex = (value) => {
    // match format +(972)-xxxxxxxxx or format 0xxxxxxxxx
    const regex = RegExp('^((\\+\\(?\\d{2,3}\\)?[-]?(\\d{9}))|([0]{1}\\d{9}))$','g');
    return regex.test(value);
}

export const emailRegex = (value) => {
    // https://stackoverflow.com/a/46181
    const regex = RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
    return regex.test(value);
}
