import searchVideos from "./lib/api"
import CSV from "./lib/csv"
import {get} from "lodash"
import config from "./lib/config"

async function main() {
  const fields = config.options.fields.split(",").map(f => f.split(":"))

  const header = fields.map(f => ({id:f[0], title:f[0]}))
  const csv = new CSV(config.options.output, header)

  for await (const videos of searchVideos(config.channelId, config.options)) {

    const data = videos.map(video => {
      return Object.fromEntries(fields.map(f => ([f[0], get(video, f[1])])))
    })
    await csv.write(data)

    await new Promise(resolve => setTimeout(resolve, config.options.waitMs))
  }
}

main()