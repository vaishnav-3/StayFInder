class ExpressError extends Error {
    constructor (status) {
        super(); //acccessing the parent container 
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ExpressError;