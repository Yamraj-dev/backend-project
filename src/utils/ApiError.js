class ApiError extends Error {
    constructor (
        statusCode,
        errors = [],
        message = "Something went wrong",
        stack = ""
    ){
        super(message),
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError; 