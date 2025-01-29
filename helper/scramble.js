function shuffleWord(word) {

    if (!word || typeof word !== 'string') {
        throw new Error("shuffleWord received an invalid word.");
    }

    return word.split('').sort(() => Math.random() - 0.5).join('');
}


module.exports = shuffleWord;