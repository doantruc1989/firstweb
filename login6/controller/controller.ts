import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../src/connect";
import { users } from "../src/entity/users";
import { post } from "../src/entity/post";
import { category } from "../src/entity/category";
import { comment } from "../src/entity/comment";
import "reflect-metadata";
import * as path from "path";
import bcrypt = require("bcrypt");
const saltRounds = 10;

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


export async function getLogin(req: Request, res: Response, next: NextFunction) {

  var options = {
    root: path.join(__dirname),
  };
  var fileName = "./html/login.html";
  res.sendFile(fileName, options);
}

export async function postLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.body.username,
    password = req.body.password,
    rememberMe = req.body.rememberMe;


  const data = await myDataSource.getRepository("users").find({
    where: { username: username },
  });
  if (data[0] == undefined) {
    res.render("post2");
  } else {
    bcrypt.compare(password, data[0].password, function (err, result) {
      if (result == true) {
        res.cookie("username", username, {
          maxAge: rememberMe ? 2592000000 : undefined,
        });
        res.render("post");
      } else {
        res.render("post2")
      }
    });
  }
}

export async function getAdminpage(req: Request, res: Response, next: NextFunction) {
  const data = await myDataSource.getRepository("users").find({
    where: { username: req.cookies.username },
  });
  if (data[0] == undefined) {
    res.render("post2");
  } else {
    if (data[0].role == "admin") {
      var options = {
        root: path.join(__dirname),
      };
      var fileName = "/html/admin.html";
      res.sendFile(fileName, options);
    } else {
      res.render("post2")
    }
  }
}

export async function getAdminUser(req: Request, res: Response, next: NextFunction) {
  const data = await myDataSource.getRepository("users").find()
  res.render('adminUser', {
    user: data
  })
}



export async function getAdminPost(req: Request, res: Response, next: NextFunction) {
  const data = await myDataSource.getRepository("post").find()
  res.render('adminPost', {
    post: data
  })
}

export function getRegister(req: Request, res: Response, next: NextFunction) {
  res.clearCookie("username");
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/register.html";
  res.sendFile(fileName, options);
}

export function createRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let encryptPsw = "";
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.psw, salt, function (err, hash) {
      encryptPsw = hash;
      console.log("hash", hash);
      const newUser = {
        password: hash,
        username: req.body.Username,
        avatar: "1666357278165.png",
      };
      myDataSource.getRepository(users).save(newUser);
      res.render("post");
    });
  });
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.username) {
    res.redirect("/login");
  }
  const user = await myDataSource.getRepository(users).find({
    where: { username: req.cookies.username },
  });
  res.render("profile", {
    name: req.cookies.username,
    img: user[0].avatar,
  });
}

export function getAVT(req: Request, res: Response, next: NextFunction) {
  res.render("changeAVT");
}

export async function changeAVT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let avt = req.file?.filename;
  await myDataSource
    .createQueryBuilder()
    .update(users)
    .set({ avatar: avt })
    .where({ username: req.cookies.username })
    .execute();
  res.redirect("/profile");
}

export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const page = parseInt(req.query.page as any) || 1;
  const perPage = 5;
  const total = await myDataSource
    .getRepository(post)
    .createQueryBuilder()
    .getCount();
  const user = await myDataSource
    .getRepository(post)
    .createQueryBuilder()
    .take(perPage)
    .skip((page - 1) * perPage)
    .getMany();
  res.render("category", { post: user, header });
}

export function postPage(req: Request, res: Response, next: NextFunction) {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/postx.html";
  res.sendFile(fileName, options);
}

export async function postCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let title = req.body.title,
    image = req.body.path,
    contentText = req.body.contentText,
    contentTextFull = req.body.contentTextFull,
    categoryId = req.body.cateID;
  let newPost = {
    title: title,
    path: image,
    content: contentText,
    contentFull: contentTextFull,
    username: req.cookies.username,
    categoriesId: categoryId,
  };
  await myDataSource.getRepository("post").save(newPost);
  res.render("post");
}

export async function getCategoryTT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 3 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result, header
  });
}

export async function getCategoryQT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 2 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result, header
  });
}

export async function getCategoryTS(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 4 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result, header
  });
}

export async function getCategoryTTiet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 1 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result, header
  });
}

export async function toCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = await myDataSource.getRepository(category).find()
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.params.id },
  });
  const comment = await myDataSource.getRepository("comment").find({
    where: { postId: req.params.id },
  });
  res.render("categoryDetail", {
    post, comment, header
  });
}

export async function postComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let newComment = {
    content: req.body.commentContent,
    postId: req.body.commentbtn,
    username: req.cookies.username,
  };
  await myDataSource.getRepository("comment").save(newComment);
  const comment = myDataSource.getRepository("comment").find({
    where: { id: req.body.commentbtn }
  })
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.body.commentbtn }
  });
  let x = '/category/post/' + req.body.commentbtn;
  res.redirect(x)
}

export async function getHome(req: Request, res: Response, next: NextFunction) {
  const data = await myDataSource
    .getRepository(post)
    .createQueryBuilder()
    .orderBy("RAND()")
    .getMany();
  res.render("home", {
    data: data,
  });
}

export async function editPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.body.edit },
  });
  res.render("editCategory", {
    post: post,
  });
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let title = req.body.title,
    image = req.body.path,
    contentText = req.body.contentText,
    contentTextFull = req.body.contentTextFull,
    updateP = req.body.updatePost,
    delP = req.body.delPost,
    categoryId = req.body.cateID;
  if (req.body.updatePost) {
    await myDataSource
      .createQueryBuilder()
      .update(post)
      .set({
        title: title,
        path: image,
        content: contentText,
        contentFull: contentTextFull,
        id: updateP,
        // categoriesId: categoryId
      })
      .where("id = :id", { id: updateP })
      .execute();
    res.render("post");
  }
  if (req.body.delPost) {
    await myDataSource
      .createQueryBuilder()
      .delete()
      .from(post)
      .where({ id: delP })
      .execute();
    res.render("post");
  }
}

// class PostService {
//   getPostById(id: string);

//   getPostByCateId(id: string);
// }

// const postService = new PostService();
