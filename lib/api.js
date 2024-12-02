require('dotenv').config()

const API_KEY = process.env.YOUTUBE_API_KEY

const DEFAULT_PARAMS = {
  part: "snippet",
  maxResults: 50,
  type: "video",
  order: "date"
}

const {google} = require("googleapis")
const {get} = require("lodash")

const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
})

async function fetchPlaylistId(channelId) {
  const res = await youtube.channels.list({
    id: channelId,
    part: "contentDetails,snippet"
  })
  if (!res.data.items || !res.data.items.length) {
    throw new Error(`No items ${channelId}`)
  }
  const item = res.data.items[0]
  const id = get(item, "contentDetails.relatedPlaylists.uploads");
  if (!id) {
    throw new Error(`No playlist found for channel ${channelId}`)
  }
  console.log(`found channel: ${get(item, "snippet.title")} playlistId:${id}`)
  return id
}

module.exports = async function* searchVideos(channelId, options) {

  const playlistId = await fetchPlaylistId(channelId)

  let pageToken = options.pageToken
  let page = 0
  while (true) {

    page++

    console.log(`fetch start pageToken: ${pageToken} page: ${page}`)

    const response = await youtube.playlistItems.list({
      playlistId,
      ...DEFAULT_PARAMS,
      ...(pageToken ? {pageToken} : {}),
    })

    if (!response.data.items || response.data.items.length === 0) {
      break
    }
    pageToken = response.data.nextPageToken

    const videos = response.data.items
    yield videos


    if (!pageToken) {
      console.log(`fetch end`)
      break
    }
    if (options.maxPage !== 0 && options.maxPage <= page) {
      console.log(`max page reached ${page}`);
      break
    }
    console.log(`fetch end: nextPage token:${pageToken} page:${page}`)
  }
}