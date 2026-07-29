const express = require("express");
const app = express();
const PORT = 3000;

// Articles routing
app.get("/api/v1/articles", (res, req) => {

})

app.get("/api/v1/article/:id", (res, req) => {

})

app.post("/api/v1/article", (res, req) => {

})

app.patch("/api/v1/article/:id", (res, req) => {

})

app.delete("/api/v1/article/:id", (res, req) => {

})

// Comments routing
app.get("/api/v1/article/:id/comments", (res, req) => {

})

app.get("/api/v1/article/:id/comment/:comment_id", (res, req) => {

})

app.post("/api/v1/article/:id/comment", (res, req) => {

})

app.patch("/api/v1/article/:id/comment/:comment_id", (res, req) => {

})

app.delete("/api/v1/article/:id/comment/:comment_id", (res, req) => {

})


app.listen(process.env.PORT, () => {
  console.log(`App started at port: ${process.env.PORT}`)
})
