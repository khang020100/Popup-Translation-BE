import mongoose from "mongoose";

const DictionarySchema = new mongoose.Schema({
    term:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        trim: true
    },
    phonetic: String,
    definitions :[{
        partOfSpeech: String,
        def: String,
    }]
});

const Dictionary = mongoose.model('Dictionary', DictionarySchema);
export default Dictionary;