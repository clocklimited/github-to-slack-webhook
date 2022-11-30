# github-to-slack-webhook
a server to forward github approved pull requests to a slack channel

## Run

`node index.js`

## Summary

<!-- What was asked? Where was the requested posted? Any links to basecamp, productive, slack etc. are helpful to the reviewer to understand full context. -->

An application for forwarding approved GitHub pull request notifications into Slack

## Description

<!-- Briefly summarise the contents of this pull request. How did you fix the bug / build the feature? This can help the reviewer when reading through the code. -->

The GitHub webhook is configured to call the express server when a review to a pull request is made. _If replicating remember to uncheck **pulls** which is checked by default_. The application then parses the request to retrieve the reviewer, their avatar, the title of the pull request, its link and the repository and formats it to the Slack block format [https://app.slack.com/block-kit-builder](url) then sends it to the appropriate channel which is set by the slack webhook api environment variable.

## Evidence

<!-- Screenshots (both before and after), screen captures and looms should go here -->

<img width="373" alt="image" src="https://user-images.githubusercontent.com/40996669/204606934-50e89ef0-df2b-4090-8564-f43554b65baa.png">

## Any caveats, potential risks or outstanding actions?

<!-- Are there limitations? Do you consider this feature/fix to be complete? Is there any other work required? -->
This is so far only configured to work with a single channel
