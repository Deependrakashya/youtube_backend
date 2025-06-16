class ApiErrors extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.message = message;
        this.data = null;
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            message: this.message,
            data: this.data,
            statusCode: this.statusCode,
            success: this.success,
            errors: this.errors,
            // stack: this.stack
        };
    }
}

export { ApiErrors };
