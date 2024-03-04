const router = require("express").Router();
const client = require("../client");

router.get("/", (req, res) => {
  client
    .fetch(
      `*[_type == 'post'] {
        _type,
        _id,
        title,
        body[] {
          children[] {
            text
          }
        },
        nickname,
        publishedAt,
        author-> {
          name
        },
        mainImage {
          asset -> {
            url
          }
        }
      }`
    )
    .then((data) => {
      let chunk = [];
      let chunkSize = 3;

      for (let i = 0; i < chunkSize; i++) {
        const post = {
          type: data[i]._type,
          id: data[i]._id,
          author: data[i].author.name,
          nickname: data[i].nickname,
          publishedAt: data[i].publishedAt.replace("-", " ").replace("-", " "),
          title: data[i].title,
          mainImage: data[i].mainImage.asset.url,
          txt: data[i].body[0].children[0].text,
        };
        chunk.push(post);
      }

      res.render("index", {
        posts: chunk,
      });
    })
    .catch(console.error);
});

module.exports = router;
