class custom_Error extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = null

    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;

    }
}

export{custom_Error}