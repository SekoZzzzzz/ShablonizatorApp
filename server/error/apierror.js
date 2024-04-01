class Apierror extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }
    static badRequest (message){
        return new Apierror(404, message)
    }
    static internal(message){
        return new Apierror(500, message)
    }
    static forbidden(message){
        return new Apierror(403, message)
    }
}

module.exports = Apierror