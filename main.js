import fs from 'fs';
import * as wanakana from 'wanakana';

const CURRENT_PATH = process.cwd();
const IMGS_DIR = './images/';
const WORDS_DIR = CURRENT_PATH + '/words/';
const DATA_FILE_DIR = CURRENT_PATH + '/data.json';

export default class Word {
    constructor(japanese) {
        this.japanese = japanese;
        this.romaji = this.createRomaji();
        this.imgUrl = this.createImgUrl();
    }

    createRomaji() {
        return wanakana.toRomaji(this.japanese);
    }

    createImgUrl() {
        const img_child_folders = fs.readdirSync(IMGS_DIR);

        for (const folder of img_child_folders) {
            const dir = IMGS_DIR + folder;

            if (!fs.lstatSync(dir).isDirectory()) {
                continue;
            }

            const files = fs.readdirSync(dir);

            for (const file of files) {
                let fileName = file.split('.')[0];
                if (fileName == this.romaji) {
                    return `${dir}/${file}`;
                }
            }
        }
    }
}

function getAllWords() {
    let words = [];

    let words_files = fs.readdirSync(WORDS_DIR);
    const index = words_files.indexOf('.DS_Store');
    words_files = index !== -1 ? words_files.splice(index, 1) : words_files;

    while (words_files.length > 0) {
        let jpWords = fs.readFileSync(WORDS_DIR + words_files.shift(), 'utf-8').split('\n');
        words = words.concat(jpWords);
    }

    return words;
}

function createJsonDataAllWords() {
    const jpWords = getAllWords();
    const objWords = [];

    for (const jpWord of jpWords) {
        objWords.push(new Word(jpWord));
    }

    return JSON.stringify(objWords, null, 4);
}

function createDataJsonFile() {
    const data = createJsonDataAllWords();
    fs.writeFileSync(DATA_FILE_DIR, data, 'utf-8');
    console.log('>> Created data.json file!')
}

createDataJsonFile();