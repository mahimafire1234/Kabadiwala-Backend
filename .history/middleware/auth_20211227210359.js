const jwt= require("jsonwebtoken");
const User= require("../models/user")

//guard
module.exports.verifyUser = function(req,res,next){
    try{
        if(!req.headers.authorization){
            res.json({
                message: "No token"
            })
        }
        else{
            const token=  req.headers.authorization.split(" ")[1];
<<<<<<< HEAD
            const data = jwt.verify(token, "anysecretkey");
            user.findOne({_id: data.YourID})   /// database mah gayera check garxa findONe le with respect to id
            .then(function(result){            //aabo result mah tyo id ko sab data xa(like tyo id related usename all )
                if(result){  
                    if(result.usertype === "user"){
                        req.userdata = result;
                        next()
                    }
=======
        const data = jwt.verify(token, "anysecretkey");
        User.findOne({_id: data.YourID})   /// database mah gayera check garxa findONe le with respect to id
        .then(function(result){            //aabo result mah tyo id ko sab data xa(like tyo id related usename all )
            if(result){
                
                if(result.usertype === "user"){
                    req.userdata = result;
                    next()
                }
>>>>>>> b0f48c7e666f9ca4bf09a8f545e132f22bcfa63c
                else{
                    res.json({
                        message: "Unauthorizedd"
                    })
                }  
            }else{
                res.json({
                    message:"user not found"
                })
            }
        })
        .catch(function(e){
            console.log(e)
            res.json({
                message: "something went wrong"
            })
        })
    }
    }
    catch(e){
        console.log(e)
        res.status(401).json({error:e})
    }
}
module.exports.verifyAdmin = function(req,res,next){
    try{
        const token= req.headers.authorization && req.headers.authorization.split(" ")[1];
        if(!token){
            res.json({
                message: "No token"
            })
        }
        else{
        const data = jwt.verify(token, "anysecretkey");
        User.findOne({_id: data.YourID})   /// database mah gayera check garxa findONe le
        .then(function(result){            //aabo result mah tyo id ko sab data xa(like tyo id related usename all )
            if(result){    
                if(result.usertype === "company"){
                    req.userdata = result;

                    next()
                }
                else{
                    res.json({
                        message: "Unauthorized"
                    })
                }
            }else{
                res.json({
                    message:"company not  found"
                })
            }
        })
        .catch(function(e){
            console.log(e)
            res.json({
                message: "something went wrong"
            })
        })
    }
    }
    catch(e){
        console.log(e)
        res.status(401).json({error:e})
    }
}