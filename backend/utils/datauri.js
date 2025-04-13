// utils/datauri.js
import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) return null;

    const extName = path.extname(file.originalname);
    return parser.format(extName, file.buffer);
};

export default getDataUri;
