export const isUserResponseValid = (response) => {
    if (!(response && response.data)) {
        return false;
    }
    const user = response.data.user;
    if (!user) {
        return false;
    }
    if (!user.email) {
        return false;
    }
    if (!user._id) {
        return false;
    }
    if (!user.name) {
        return false;
    }
    return true;
}