import express, { Express, Request, Response } from 'express';
const router = express.Router();
import {
    getLogin,
    postLogin,
    getHome,
    getRegister,
    getProfile,
    changeAVT,
    editPost,
    getCategory, getCategoryTT, getCategoryQT, getCategoryTS, getCategoryTTiet,
    updatePost,
    postPage,
    postCategory,
    toCategory,
    createRegister
} from '../controller/controller';
import multer from 'multer';
import * as path from 'path';

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', createRegister);
router.post('/profile/changeAVT', upload.single('avatar'), changeAVT);
router.get('/profile', getProfile);

router.post('/category/edit', editPost);
router.post('/category/edit/updatePost', updatePost);
router.get('/category/thethao', getCategoryTT)
router.get('/category/quocte', getCategoryQT)
router.get('/category/thoisu', getCategoryTS)
router.get('/category/thoitiet', getCategoryTTiet)
router.get('/category/:page', getCategory)
router.get('/category/post/:id', toCategory);

router.get('/pos', postPage);
router.post('/post', postCategory);
router.get('/', getHome);

export = router;