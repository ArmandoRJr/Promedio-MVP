export const isAuthUserValid = (response) => {
    if (!response || !response.data || !response.data.user || !response.data.token) {
        return false;
    }
    const authUser = response.data.user;
    if (!authUser) {
        return false;
    }
    if (!authUser.email) {
        return false;
    }
    if (!authUser._id) {
        return false;
    }
    if (!authUser.name) {
        return false;
    }
    return true;
}