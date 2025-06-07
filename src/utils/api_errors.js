class ApiErrors  extends Error{
    constructor(
        statusCode,
        message= "something went wrong",
        errors=[],
        statcks = ""
    ) {
        super(message)
        this.message = message
        this.data = null
        this.statusCode = statusCode
        this.success = false
        this.errors = errors
        if (statcks) {
            this.stack = statcks
        }else{
            Error.captureStackTrace(this,this)
        }
    }
}
export {ApiErrors};