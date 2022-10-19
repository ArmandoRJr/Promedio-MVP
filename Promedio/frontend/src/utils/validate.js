export const isUserValid = (user) => {
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

export const isResponseValid = (response) => {
    return response && response.data;
}

export const isAuthUserValid = (user) => {
    if (!isUserValid(user)) {
        return false;
    }

    if (!user.token) {
        return false;
    }

    return true;
}