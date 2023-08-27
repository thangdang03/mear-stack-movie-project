const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Acount} = require('../Model/movies');
class ath{
    
    register=async(req,res)=>{
        try {
            const {username,email,password}= req.body;
            if(!username && !email && !password){
                res.status(403).json(" email or username or password is not valid");
                return;
            }
            
            const check_email = await Acount.findOne({email});
            if(check_email){
                res.status(400).json(" The Email was registered ");
                return;
            }
            const name = await Acount.findOne({username});
            if(name){
                res.status(403).json("The username was registered");
                return;
            }
            const halt = await bcrypt.genSalt(10);
            const hashpasword =  await bcrypt.hash(password,halt);
            const user = await Acount.create({
                username: username,
                email: email,
                password: hashpasword
            });
            const {Evaluate,profilePic,...other} = user._doc
            res.status(200).json(other);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }

    login= async(req,res)=>{
        try {
            const {email,password}= req.body;
            if(!email&&!password){
                res.status(403).json(" email or password is not register");
                return;
            }
            const check_email = await Acount.findOne({email: email});
            if(check_email){
                const check_password = await bcrypt.compare(password,check_email.password);
                if(check_password === true){
                    const accesstoken =await this.create_accesstoken(check_email);
                    const refesh_token = await this.creat_refeshtoken(check_email);

                    res.cookie("refeshtoken",refesh_token,{
                        httpOly: true,
                        secure: false,
                        sameSite:"strict",
                    });

                    const {password,...other} = check_email._doc;
                    res.status(200).json({...other,accesstoken});
                }else{
                    res.status(400).json("the password wrong");
                }
            }else{
                res.status(400).json("the email wrong");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    create_accesstoken = async(User)=>{
        var accesstoken = await jwt.sign({
            _id: User._id,
            isAdmin: User.isAdmin
        }, process.env.RECERT,{
            expiresIn: '30s'
       });
        return accesstoken;
    }

    creat_refeshtoken = async(User)=>{
       var refesh_token = await jwt.sign({
        _id: User._id,
        isAdmin: User.isAdmin
    }, process.env.PASS_REFESH_TOKEN,{
        expiresIn: '30d'
   });
        return refesh_token;
    }


    refesh_token = async(req,res)=>{
        try {
            const refesh = await req.cookies.refeshtoken;
        if(!refesh){
            res.status(400).json(" you are not login");
            return;
        }
        const veryfi = await jwt.verify(refesh,process.env.PASS_REFESH_TOKEN,async(err,user)=>{
            if(err){
                res.status(400).json(err) ;return;
            }
            // create new acesstoken
            const newacesstoken = await this.create_accesstoken(user);
            const newrefeshtoken = await this.creat_refeshtoken(user);
            // luu vao cookie 
            res.cookie("refeshtoken",newrefeshtoken,{
                httpOly: true,
                secure: false,
                path:"/",
                sameSite:"strict",
            });
            res.status(200).json({acesstoken: newacesstoken});
        })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    logout =async(req,res)=>{
          try {
            res.clearCookie("refeshtoken");
            res.status(200).json(" log out sucessfull");
          } catch (error) {
            res.status(500).json("can not log out");
          }
    }

}

module.exports = new ath;