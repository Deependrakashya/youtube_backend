// higher order func wich can take fn as paramter and retrun as well
 const asyncHandler =(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((error)=>next(error))
    }
 }

export {asyncHandler};

// const asyncHandler = (func) => (res, req, next) => {
//   try {
//     func(res, req, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
