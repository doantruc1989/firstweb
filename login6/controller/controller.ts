import { Request, Response, NextFunction } from "express";
import { myDataSource, connection } from "../src/connect";
import { users } from "../src/entity/users";
import { post } from "../src/entity/post";
import { category } from "../src/entity/category";
import "reflect-metadata";
import * as path from "path";


myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export function getLogin(req: Request, res: Response, next: NextFunction) {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/login.html";
  res.sendFile(fileName, options);
}

export function postLogin(req: Request, res: Response, next: NextFunction) {
  var username = req.body.username;
  var password = req.body.password;
  var rememberMe = req.body.rememberMe;
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        res.cookie("username", username, {
          maxAge: rememberMe ? 2592000000 : undefined,
        });
        res.redirect("/profile");
      }
    );
  } else {
    res.send(
      "Incorrect Username and/or Password! <br><a href='http://127.0.0.1:3000'>back to homepage</a>"
    );
  }
  connection.end();
}

export function getRegister(req: Request, res: Response, next: NextFunction) {
  res.clearCookie("username");
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/register.html";
  res.sendFile(fileName, options);
}

export async function createRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser = {
    password: req.body.psw,
    username: req.body.Username,
    avatar: "1666357278165.png",
  };
  const user = await myDataSource.getRepository(users).save(newUser);
  res.render('post')
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
  if (!req.cookies.username) {
    res.redirect("/login");
  }
  const user = await myDataSource.getRepository(post).find();
  res.render("category", { post: user });
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
  console.log(req.body)
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
    categoriesId: categoryId
  };
  await myDataSource.getRepository("post").save(newPost);
  res.render('post')
}

export async function getCategoryTT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 3 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result,
  });
}

export async function getCategoryQT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 2 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result,
  });
}

export async function getCategoryTS(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 4 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result,
  });
}

export async function getCategoryTTiet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = await myDataSource
    .getRepository(category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .where("post.categoriesId = :categoriesId", { categoriesId: 1 })
    .getMany();
  let result = data[0];
  res.render("categorybytag", {
    result: result,
  });
}

export async function toCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.params.id },
  });
  res.render("categoryDetail", {
    post: post,
  });
}

export async function getHome(req: Request, res: Response, next: NextFunction) {
  const data = await myDataSource.getRepository(post).createQueryBuilder().orderBy("RAND()")
    .getMany();
  res.render("home", {
    data: data,
  })
}

export async function editPost(req: Request, res: Response, next: NextFunction) {
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.body.edit }
  })
  res.render('editCategory', {
    post: post
  })
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
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
    res.render('post')
  }
  if (req.body.delPost) {
    await myDataSource
      .createQueryBuilder()
      .delete()
      .from(post)
      .where({ id: delP })
      .execute()
    res.render('post')
  }
}


// class PostService {
//   getPostById(id: string);

//   getPostByCateId(id: string);
// }

// const postService = new PostService();
