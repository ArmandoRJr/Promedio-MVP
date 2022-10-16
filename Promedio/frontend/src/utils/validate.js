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

export const isCourseResponseValid = (response) => {
    if (!(response && response.data)) {
        return false;
    }

    if (!response.data.course) {
        return false;
    }

    if (!response.data.course._id) {
        return false;
    }

    if (!response.data.course.name) {
        return false;
    }

    if (!response.data.course.description) {
        return false;
    }

    if (!response.data.course.markGoal) {
        return false;
    }

    return true;
}