import { addWordToUserList } from "../services/saveWord.js";
import { getWordListOfUser } from "../services/getWord.js";

export const saveWord = async (req, res) =>{
    try{
        const {word} = req.body;
        if(!word) {
            return res.status(400).json({msg: 'Word is required'});
        }
        const userId = req.user.id;
        const savedEntry = await addWordToUserList(userId, word);
        return res.status(200).json({savedEntry});
    }
    catch(e)
    {
        console.error("Save word error", e);
        return res.status(500).json({msg: e.message});
    }
};
export const getWords = async (req,res) =>{
    try{
        const userId =  req.user.id;
        const words = await getWordListOfUser(userId);
        if(!words||words.length === 0)
        {
            return res.status(200).json({msg: 'No word found for this user!', data: []});
        }
        return res.status(200).json({data: words});
    }
    catch(error)
    {
        console.error("Get words error:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid User ID or Word ID format." });
        }
        return res.status(500).json({ msg: "Server error: " + error.message });
    }
};