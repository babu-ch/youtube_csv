import CSV from "./csv";
import {searchVideos} from "./api";
import {get} from "lodash-es";
import {Config} from "./command";

export async function main(config: Config) {
  const fields = config.fields.split(",").map(f => f.split(":"))

  const header = fields.map(f => ({id:f[0], title:f[0]}))
  const csv = new CSV(config.output, header, !!config.pageToken)

  for await (const videos of searchVideos(config.channelId, config)) {

    const data = videos.map(video => {
      return Object.fromEntries(fields.map(f => ([f[0], get(video, f[1])])))
    })
    await csv.write(data)

    await new Promise(resolve => setTimeout(resolve, config.waitMs))
  }
}

