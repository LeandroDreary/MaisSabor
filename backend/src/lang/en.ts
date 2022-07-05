export default {
    // user errors
    "users/not-found": {
        message: "User not found.",
        status: 404
    },
    "users/username-already-exist": {
        message: "Username is already in use.",
        status: 400
    },
    "users/invalid-informations": {
        message: "Insufficient or invalid informations.",
        status: 400
    },

    // category errors
    "category/not-found": {
        message: "Category not found.",
        status: 404
    },
    "category/invalid-informations": {
        message: "Insufficient or invalid informations.",
        status: 400
    },
    "category/invalid-name-length": {
        message: "Name must to have at least 3 characteres.",
        status: 400
    },

    // login errors
    "authentication/email-password-incorrect": {
        message: "Email or password incorrect try again.",
        status: 400
    },
}