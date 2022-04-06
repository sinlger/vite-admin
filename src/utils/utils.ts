

/**获取用户token */
export const getToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user') as string)
    return user?.token
}