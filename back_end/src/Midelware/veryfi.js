const jwt =require('jsonwebtoken');


const middelwarre =  {
     // xac thuc nguoi dung
     veryfi_token: async(req,res,next)=>{
            try {
                if(!req.headers.token){
                    res.status(400).json("you don't have token");
                    return;
                }
            const token = await req.headers.token;
            if(token){
                const acess = token.split(" ")[1];
                const verify = await jwt.verify(acess,process.env.RECERT,(err,result)=>{
                    if(err){
                        console.log(err)
                        res.status(400).json("token is not valid");
                    }else{
                        req.user = result;
                       next();
                    }
                })
            }
            } catch (error) {
                res.status(400).json("you are not authentication");
            }
     },
    
    token_action_user: (req,res,next)=>{
        middelwarre.veryfi_token(req,res,()=>{
            // so sanh ma cua minh voi ma cung nguoi khac 
            if(req.user._id === req.params.id || req.user.isAdmin){
                next();
            }else{
                res.status(403).json(" you can't do it");
                return;
            }
        })
    },

    admin_token: (req,res,next)=>{
        middelwarre.veryfi_token(req,res,()=>{
            if(req.user.isAdmin){
                next();
            }else{
                res.status(403).json(" you can't do it");
                return;
            }
        })
    }

} 

module.exports = middelwarre