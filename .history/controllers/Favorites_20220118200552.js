// this file is for favorites
const FavoritesModel = require("../models/Favorites");
const User = require("../models/user");

// routes
exports.addFavorites = async (request,response)=>{
    console.log("hit")

    // get user and company id
    const id =  request.params.id;
    const companyID = request.params.companyID;
    try{
        // find user in favorites model
        let favorites=await FavoritesModel.findOne({id:id})
        let companyToadd =await User.findOne({_id:companyID});

        // find product in product model
        // check if user exists
        if(!companyToadd){
            response.json({success:false,message:"company does not exist"})
        }
        // getting product details
        const companyName = companyToadd.name;

        // if user exists check if product exists for that user
        if(favorites){
            let itemIndex = favorites.company.findIndex(p => p.companyID == companyID)
            // if product exists do nothing
            if(itemIndex > -1){
                let companyItem = favorites.company[itemIndex]
                favorites.company[itemIndex] = companyItem
            }
            // else add product for the usr
            else{
                favorites.company.push({
                    companyID,
                    companyName
                })
            }
            // save the favorites
            favorites=await favorites.save()
            return response.status(201).json({
                success :true,
                data : favorites
            })
        }
        else{
            // if favorites does not exists for user create new one
            const newWishlist = await FavoritesModel.create(
                {
                    id,
                    company:[{companyID,companyName}]
                }
            )
            return response.status(201).json({success :true,data : newWishlist})
        }

    }
    catch{
        (error)=>{
            response.json({success:false, error:error});
    }};

};

// get the favorites item
exports.getFavorites= async (request,response) => {
    // get user id
    const userId = request.params.id;
    // check if user exists
    try {
        Category.find({ userID: company_id }).then(
            (data) => {
                if(data.length > 0){
                    response.status(200).send({success:true,data:data});
                }
                else {
                    response.status(404).send({ success: false, message: "No items found" });

                }
            }
        )
    }
    catch (error) {
        response.status(404).json({ error: error })
    }
    try{
        // if user exists in the favorites model and the product kength for that user us greater than 0
        const favoriteItem = await FavoritesModel.findOne({id:userId})
        if(favoriteItem && favoriteItem.company.length >0){
            return response.send({success:true,favoriteItem:favoriteItem})
        }else{
            response.send(null)
        }
    }
    catch(error) 
        { response.status(404).json({success : "false" , error:error})
        }

};