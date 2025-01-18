export function toLocalDateTime(utc) {
    const utcDate = new Date(utc);
    const offsetMinutes = new Date().getTimezoneOffset();
    const localDT = new Date(utcDate.getTime() - offsetMinutes * 60000);
    return localDT.toLocaleString();
}

export function getToken() {
    return sessionStorage.getItem("token");
}

export function setToken(token) {
    sessionStorage.setItem("token", token);
}