export const addDeviceIdToCookie = (deviceID?: string) => {
  if (!deviceID) return;

  let cookieDeviceId;
  const cookies = decodeURIComponent(document?.cookie).split(";");
  for (const item of cookies) {
    if (item.includes("deviceId=")) {
      cookieDeviceId = item.split("=")[1];
    }
  }
  if (!cookieDeviceId) {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    document.cookie = `deviceId=${deviceID}; expires=${date.toUTCString()}; path=/`;
  }
};

export const GetCookieDeviceId = () => {
  let cookieDeviceId = undefined;
  const cookies = decodeURIComponent(document?.cookie).split(";");
  for (const item of cookies) {
    if (item.includes("deviceId=")) {
      cookieDeviceId = item.split("=")[1];
    }
  }
  return(cookieDeviceId);
};
