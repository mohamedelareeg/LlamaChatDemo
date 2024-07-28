
// Function to convert an object to query string
const query = (obj) =>
    Object.keys(obj)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
        .join("&");

// Function to generate UUID
const uuid = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-${Date.now().toString(16)}`.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Function to generate message ID
const messageId = () => {
    const randomBytes = (Math.floor(Math.random() * 1338377565) + 2956589730).toString(2);
    const unix = Math.floor(Date.now() / 1000).toString(2);
    return BigInt(`0b${unix}${randomBytes}`).toString();
};

// Function to format text with line breaks
const format = (text) => text.replace(/(?:\r\n|\r|\n)/g, "<br>");
