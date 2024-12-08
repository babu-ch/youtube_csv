import {test, expect, vi, describe, afterEach} from 'vitest';
import {fetchPlaylistId, searchVideos} from "../lib/api";
import {youtube_v3} from "googleapis";

afterEach(() => {
  vi.restoreAllMocks();
})


const channelApi = vi.hoisted(() => vi.fn())
const playlistApi = vi.hoisted(() => vi.fn())
vi.mock('googleapis', () => ({
  google: {
    youtube: () => {
      return {
        playlistItems: {
          list: playlistApi
        },
        channels: {
          list: channelApi
        }
      }
    }
  }
}))


describe("fetchPlaylistId", () => {

  test("idが取得できない場合エラー", async () => {
    channelApi.mockReturnValue({ data: { items: [] } })
    await expect(async () => {
      await fetchPlaylistId("id")
    }).rejects.toThrowError()
  })

  test("idが取得できる", async () => {
    channelApi.mockReturnValue({ data: { items: [{contentDetails:{relatedPlaylists:{uploads:"playlistId"}}}] } })
    const id = await fetchPlaylistId("id")
    expect(id).toBe("playlistId")
  })
})

describe("searchVideos", () => {

  test("video取得できる", async () => {
    channelApi.mockReturnValue({ data: { items: [{contentDetails:{relatedPlaylists:{uploads:"playlistId"}}}] } })
    const videoItem = {videoId: "id!"}
    playlistApi.mockReturnValue({ data: { items: [
      videoItem
        ] } })
    const iter =  searchVideos("id", {fields: "", maxPage: 0, output: "", pageToken: "", waitMs: 0})
    const res = await iter.next()
    expect((res.value as youtube_v3.Schema$PlaylistItem[])[0]).toBe(videoItem)
  })
})