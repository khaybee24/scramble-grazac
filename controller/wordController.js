const Words = require('../model/wordSchema')


const addWord = async (req, res) => {
    const { word } = req.body;
    if (!word) return res.status(400).json({ message: "Word is required" });

    try {
        const newWord = new Words({
             word: word

         });
        await newWord.save();
        res.json({ message: "Word added successfully!", word: newWord });
    } catch (error) {
        console.log(error);

       return res.status(500).json({ message: "Error adding word", error });
    }
};

const getWords = async (req, res) => {
    try {
        const words = await Words.find({});

        if(words.length === 0){
            return res.status(404).json({ message: "No words found on the database" }) 
        }

        return res.status(200).json({ message: "these are the words on the database", words });
     } catch (error) {
        return res.status(500).json({ message: " internal server error" })
        }
}

module.exports = {addWord, getWords};