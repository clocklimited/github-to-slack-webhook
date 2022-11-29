// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const path = require("path");
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );
// Initialize express and define a port
const app = express()
const PORT = process.env.PORT || 3000;
const slackWebhook = process.env.SLACKWEBHOOK || dotenv.SLACKWEBHOOK

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post("/hook", (req, res) => {
  if(req.body && req.body.review && req.body.review.state === 'approved'){

    const reviewer = req.body.review.user && req.body.review.user.login
    const reviewerAvatar = req.body.review.user && req.body.review.user.avatar_url
    const title = req.body.pull_request && req.body.pull_request.title
    const link = req.body.pull_request && req.body.pull_request.html_url
    const repository = req.body.repository && req.body.repository.name

    axios.post(slackWebhook, {
        "blocks": [
            {
                "type": "header",
                "text": {
                  "type": "plain_text",
                  "text": repository
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": title,
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                  {
                    "type": "image",
                    "image_url": reviewerAvatar,
                    "alt_text": "image"
                  },
                  {
                    "type": "plain_text",
                    "text": `Reviewed by: ${reviewer}`
                  }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `<${link}|Pull Request>`
                }
            }
        ]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  res.status(200).end()
})

// Start express on the defined port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))