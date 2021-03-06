const jwt= require("jsonwebtoken");
const User= require("../models/user")

//verify user
module.exports.verifyUser = function(req,res,next){
    try{
        if(!req.headers.authorization){
            res.json({
                message: "No token"
            })
        }
        else{
            const token=  req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "anysecretkey");
        User.findOne({_id: data.YourID})   /// database mah gayera check garxa findONe le with respect to id
        .then(function(result){            //aabo result mah tyo id ko sab data xa(like tyo id related usename all )
            if(result){
                
                if(result.usertype === "user"){
                    req.userdata = result;
                    next()
                }
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

//verify company (admin)
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


module.exports.verifyLoggedIn = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1] // bearer token
        const data = jwt.verify(token, "anysecretkey")

        User.findOne({_id: data.YourID})
        .then(result => {
            req.userdata = result
            next()
        })
        .catch(err => {
            res.status(401).json({error: err})
        })
    }
    catch(err){
        res.status(401).json({
            error: err,
            message: "Authentication failed"
        })
    }
}