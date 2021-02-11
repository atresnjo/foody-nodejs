export const accessTokenKey: string = 'access_token'
export const getAccessToken = () => localStorage.getItem(accessTokenKey)
export const storeAccessToken = (token: string) =>
    localStorage.setItem(accessTokenKey, token)
export const removeAccessToken = () => localStorage.removeItem(accessTokenKey)
