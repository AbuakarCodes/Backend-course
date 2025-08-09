class standardApi_Response {
    constructor(statusCose, data, Message = "Something Went Wrong") {
        this.statusCose = statusCose
        this.data = data
        this.Message = Message
        this.success = statusCose < 400
    }
}
export { standardApi_Response }