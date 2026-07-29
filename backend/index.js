const express = require("express");
const app = express();
const db = require("./models");
const { Op } = require("sequelize");
const { connectDB } = require("./database");

app.use(express.json());

async function get_article_by_id(id, res) {
  const article = await db.Article.findByPk(id);
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return null;
  }
  return article;
}
// Articles routing
app.get("/api/v1/articles", async (req, res) => {
  const articles = await db.Article.findAll();
  res.json(articles);
});

app.get("/api/v1/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await get_article_by_id(id, res);
  if (!article) return;

  res.json(article);
});

app.post("/api/v1/articles", async (req, res) => {
  const article = await db.Article.create({
    title: req.body.title,
    content: req.body.content,
  });

  res.status(201).json(article);
});

app.patch("/api/v1/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await get_article_by_id(id, res);
  if (!article) return;

  if (req.body.title) {
    article.title = req.body.title;
  }
  if (req.body.content) {
    article.content = req.body.content;
  }

  await article.save();
  res.status(200).json(article);
});

app.delete("/api/v1/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await get_article_by_id(id, res);
  if (!article) return;

  await article.destroy();
  res.status(200).json({ message: "Article successfully deleted" });
});

async function get_comment_by_id(article_id, id, res) {
  const comment = await db.Comment.findOne({
    where: {
      articleId: article_id,
      id: id,
    },
  });

  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return null;
  }

  return comment;
}
// Comments routing
app.get("/api/v1/articles/:id/comments", async (req, res) => {
  const { id } = req.params;

  const article = await get_article_by_id(id, res); // check if article exist
  if (!article) return;

  const comments = await db.Comment.findAll({
    where: {
      articleId: id,
    },
  });

  res.status(200).json(comments);
});

app.get("/api/v1/articles/:id/comments/:comment_id", async (req, res) => {
  const { id, comment_id } = req.params;

  const article = await get_article_by_id(id, res); // check if article exist
  if (!article) return;
  const comment = await get_comment_by_id(id, comment_id, res);
  if (!comment) return;

  res.status(200).json(comment);
});

app.post("/api/v1/articles/:id/comments", async (req, res) => {
  const { id } = req.params;
  const article = await get_article_by_id(id, res); // check if article exist
  if (!article) return;

  const comment = await db.Comment.create({
    content: req.body.content,
    articleId: id,
  });

  res.status(201).json(comment);
});

app.patch("/api/v1/articles/:id/comments/:comment_id", async (req, res) => {
  const { id, comment_id } = req.params;
  const article = await get_article_by_id(id, res); // check if article exist
  if (!article) return;

  const comment = await get_comment_by_id(id, comment_id, res);
  if (!comment) return;

  if (req.body.content) {
    comment.content = req.body.content;
  }

  await comment.save();
  res.status(200).json(comment);
});

app.delete("/api/v1/articles/:id/comments/:comment_id", async (req, res) => {
  const { id, comment_id } = req.params;

  const article = await get_article_by_id(id, res); // check if article exist
  if (!article) return;

  const comment = await get_comment_by_id(id, comment_id, res);
  if (!comment) return;

  await comment.destroy();
  res.status(200).json({ message: "Comment deleted" });
});

app.get("/api/v1/analytic/comments/", async (req, res) => {
  const { dateFrom, dateTo } = req.query;

  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  if (isNaN(from) || isNaN(to)) {
    res.status(400).json({ message: "Invalid dateTo or dateFrom" });
  }

  const comments = await db.Comment.findAll({
    where: {
      createdAt: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
    include: [
      {
        model: db.Article,
        attributes: ["id", "title"],
      },
    ],
  });

  const grouped_comments = comments.reduce((articles, comment) => {
    const articleId = comment.articleId;
    if (!articles[articleId]) {
      articles[articleId] = {
        articleId,
        title: comment.Article?.title,
        comments: [],
      };
    }
    articles[articleId].comments.push(comment);
    return articles;
  });
  res.status(200).json(Object.values(grouped_comments));
});

async function main() {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`App started at port: ${process.env.PORT}`);
  });
}

main();
