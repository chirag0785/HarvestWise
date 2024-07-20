class ErrorHandler extends Error{
    constructor(statusCode,message="Code Fat gya",errors=[],stack){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.errors=errors;
        this.stack=stack;
        this.success=false;
    }
}

module.exports=ErrorHandler;