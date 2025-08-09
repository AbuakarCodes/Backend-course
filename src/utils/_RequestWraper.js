function requestError_Handler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.log("Error Occures", error)
        }
    }
}

export {requestError_Handler}