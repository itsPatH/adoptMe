export default class CustomError extends Error {
    constructor(name, status, message, cause) {
        super(message);
        this.name = name;
        this.status = status;   
        this.message = message;
        this.cause = cause;  
    }
}