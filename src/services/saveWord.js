    import Dictionary from '../models/dictionary.js'
    import UserWords from '../models/UserWords.js'
    import axios from 'axios';

    export const addWordToUserList = async (userId, wordText) =>
    {
        try{
        let dictionaryEntry = await Dictionary.findOne({term: wordText});

        if(!dictionaryEntry)
        {
            const response = await axios.get('https://api.datamuse.com/words', {
            params: {
            sp: wordText,
            md: 'dpr',   
            max: 1,
            ipa: 1        
            }});
            const remoteData = response.data; // Axios puts the JSON here

            if (!remoteData.length) {
                throw new Error(`Word "${wordText}" not found.`);
            }
            const entry = remoteData[0];
            const definitions = (entry.defs || []).map(def => {
                const parts = def.split('\t');
                return{
                    partOfSpeech: parts[0] || 'other',
                    def: parts[1] || parts[0] 
                }
            });
            const ipaTag = entry.tags ? entry.tags.find(t => t.startsWith('ipa_')) : null;
            const phonetic = ipaTag ? `/${ipaTag.replace('ipa_pron:', '')}/` : '';
            
            dictionaryEntry = await Dictionary.create({
            term: entry.word,
            phonetic: phonetic,
            definitions: definitions
        });
        }
        const userWords = await UserWords.findOneAndUpdate(
            {
                user: userId, word: dictionaryEntry._id
            },
            {},
            {new: true, upsert: true}
        );
        return userWords;
        }
        catch(error){
            if(error.response){
                throw new Error(`External API error: ${error.response.status}`);
            }
            else if(error.request) {
                throw new Error("No response from dictionary service");
            }
            else{
                throw error;
            }
        }
    };
