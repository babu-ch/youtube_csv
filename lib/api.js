require('dotenv').config()

const API_KEY = process.env.YOUTUBE_API_KEY

const DEFAULT_PARAMS = {
  part: "snippet",
  maxResults: 50,
  type: "video",
  order: "date"
}

const {google} = require("googleapis")

const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
})

module.exports = async function* searchVideos(channelId, options) {
  let pageToken = options.pageToken
  let page = 0
  while (true) {

    page++

    console.log(`fetch start pageToken: ${pageToken} page: ${page}`)

    const response = await youtube.search.list({
      ...DEFAULT_PARAMS,
      ...{channelId},
      ...(pageToken ? {pageToken} : {}),
    })

    if (!response.data.items || response.data.items.length === 0) {
      break
    }
    pageToken = response.data.nextPageToken

    const videos = response.data.items
    yield videos


    if (options.maxPage !== 0 && options.maxPage <= page) {
      console.log(`max page reached ${page}`);
      break
    }
    console.log(`fetch end: nextPage token:${pageToken} page:${page}`)
  }
}