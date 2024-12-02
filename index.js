const searchVideos = require("./lib/api")
const CSV = require("./lib/csv");
const {get} = require("lodash")
require("./lib/config")

async function main() {
  const fields = global.options.fields.split(",").map(f => f.split(":"))

  const header = fields.map(f => ({id:f[0], title:f[0]}))
  const csv = new CSV(global.options.output, header)

  for await (const videos of searchVideos(global.channelId, global.options)) {

    const data = videos.map(video => {
      return Object.fromEntries(fields.map(f => ([f[0], get(video, f[1])])))
    })
    await csv.write(data)

    await new Promise(resolve => setTimeout(resolve, options.waitMs))
  }
}

main()