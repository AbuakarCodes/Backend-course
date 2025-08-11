class standardApi_Response {
    constructor(statusCose,  Message = "Something Went Wrong", data) {
        this.statusCose = statusCose
        this.Message = Message
        this.success = statusCose < 400
        this.data = data
    }
}
export { standardApi_Response }