const customError = (error) => {
    return {
        "errors": [
            { "msg": error }
        ]
    }
}



module.exports = customError 