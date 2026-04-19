import mongoose from "mongoose";


const UserWordsSchema = mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    word:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Dictionary',
        required: true
    }
}, { timestamps: true });

UserWordsSchema.index({ user: 1, word: 1 }, { unique: true });

export default mongoose.model('UserWords', UserWordsSchema);
