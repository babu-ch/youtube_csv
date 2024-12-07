import {Config} from "./config"
import dotenv from "dotenv"
dotenv.config()
import {google} from "googleapis"
import {get} from "lodash"
import {youtube_v3} from "googleapis/build/src/apis/youtube/v3";

const API_KEY = process.env.YOUTUBE_API_KEY

const DEFAULT_PARAMS = {
  part: ["snippet"],
  maxResults: 50,
  type: "video",
  order: "date"
}

const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
})

export async function fetchPlaylistId(channelId:string) {
  const res = await youtube.channels.list({
    id: [channelId],
    part: ["contentDetails,snippet"]
  } as youtube_v3.Params$Resource$Channels$List)
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

export async function* searchVideos(channelId:string, options:Config["options"]) {

  const playlistId = await fetchPlaylistId(channelId)

  let pageToken:string|null|undefined = options.pageToken
  let page = 0
  while (true) {

    page++

    console.log(`fetch start pageToken: ${pageToken} page: ${page}`)

    const response = await (youtube.playlistItems).list({
      playlistId,
      ...DEFAULT_PARAMS,
      ...(pageToken ? {pageToken} : {}),
    } as youtube_v3.Params$Resource$Playlistitems$List) as {data:youtube_v3.Schema$PlaylistItemListResponse}

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