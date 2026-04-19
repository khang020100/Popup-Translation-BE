import Dictionary from '../models/dictionary.js'
import UserWords from '../models/UserWords.js'

export const getWordListOfUser = async (userId) => {
        let list = await UserWords.find({ user: userId }).populate('word').lean();
        return list;
}
