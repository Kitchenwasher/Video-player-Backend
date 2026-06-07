export const asyncHandler = (functionPassed)=>{
    return (req,res,next)=>{
        Promise.resolve(functionPassed(req,res,next)).catch((err)=>next(err))
    } 
}

const asyncHandlerTryCatch = (functionPassed) => (req,res,next)=>{
    try {
        
    } catch (error) {
        res.status(error.status||489).json({
            
            
        })
    }
}