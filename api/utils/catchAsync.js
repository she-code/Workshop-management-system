/**module for handling async function errors */
module.exports=(fn)=>{
    return (req,res,next)=>{
        return fn(req,res,next).catch(next)
    }
}