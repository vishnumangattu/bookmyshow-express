import mongoose, { mongo } from "mongoose";

const movieSchema=new mongoose.Schema({
    title:{type:String},
    duration:{type:Number},
    genre:{type:String},
    releaseDate:{type:String},
    language:{type:String},
    certification:{type:String},
    titleimg:{type:String},
    banimg:{type:String}

});
export default mongoose.model.Movies||mongoose.model("Movie",movieSchema);