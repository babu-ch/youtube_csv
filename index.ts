import {Args, cli, CommandContext, define} from "gunshi";
import z from "zod";

const examples = `
# Examples

# help
$ npm run start -- --help

# maxPage=1でお試し
$ npm run start -- <channelId> --maxPage=1

# 全動画取得
npm run start -- <channelId>

# pageTokenを指定してページの途中から取得(append)
node run start -- <channelId> --output=test.csv --pageToken=token --maxPage=5

# 取得フィールドを変更
# フィールドはこちらから確認 https://developers.google.com/youtube/v3/docs/playlistItems?hl=ja#resource
node run start -- <channelId> --output=test.csv --maxPage=1 --fields=id:snippet.resourceId.videoId,title:snippet.title,published:snippet.publishedAt
`

const args = {
  channelId: {
    type: 'positional',
    description: '取得するチャンネルのID'
  },
  waitMs: {
    type: 'custom',
    description: '1回取得ごとにsleepするms',
    default: 100,
    parse: v => z.number().positive().parse(Number(v))
  },
  pageToken: {
    type: 'string',
    description: 'pageToken 前回の続きからデータ取得する場合',
    default: '',
  },
  maxPage: {
    type: 'custom',
    description: '取得するページ数',
    default: 0,
    parse: v => z.number().min(0).parse(Number(v))
  },
  output: {
    type: 'custom',
    description: 'ファイル名を指定したい場合 ex:test.csv',
    default: 'output.csv',
    parse: v => z.string().regex(/.+\.csv$/).parse(v)
  },
  fields: {
    type: 'custom',
    description: '取得するフィールド カラム名:アクセスするフィールド をカンマ区切りで指定',
    default: 'id:snippet.resourceId.videoId,title:snippet.title,description:snippet.description,thumbnail:snippet.thumbnails.default.url,published:snippet.publishedAt',
    parse: v => z.string().regex(/^(\w+:[\w.]+,?)+$/).parse(v)
  },
  // memo 指定時channel無視するなら全部optionにした方がいいか...
  playListId: {
    type: 'string',
    description: 'playlistのid. 指定時はchannelを無視',
    default: ''
  },
} satisfies Args

export type Ctx = CommandContext<typeof args>
export type Config = Ctx['values']

const command = define({
  name: 'youtube_csv',
  description: 'This is a tool to convert videos from a specific YouTube channel into CSV.',
  args,
  examples,
  run: async (ctx) => {
    console.log(ctx.values)
    // await main(ctx.values)
  }
})

await cli(process.argv.slice(2), command)
