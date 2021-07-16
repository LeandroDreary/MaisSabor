export default {
    // user errors
    "users/not-found": {
        message: "User not found.",
        status: 404
    },
    "user/username-already-exist": {
        message: "Username is already in use.",
        status: 400
    },
    "User/invalid-informations": {
        message: "Insuficient or invalid informations.",
        status: 400
    },

    // category errors
    "category/not-found": {
        message: "Category not found.",
        status: 404
    },
    "category/invalid-informations": {
        message: "Insuficient or invalid informations.",
        status: 400
    },
    "category/invalid-name-length": {
        message: "Name must to have at least 3 characteres.",
        status: 400
    },
}