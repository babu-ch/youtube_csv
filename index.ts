import {schema} from "./lib/config"
import {Args, CommandContext, define} from "gunshi";
import {main} from "./lib/main";
import z from "zod";

const args = {
  channelId: {
    type: 'positional',
    description: '取得するチャンネルのID'
  },
  waitMs: {
    type: 'number',
    description: '1回取得ごとにsleepするms',
    default: 100,
    parse: v => z.number().positive().parse(v)
  },
  pageToken: {
    type: 'string',
    description: 'pageToken 前回の続きからデータ取得する場合',
    default: '',
  },
  maxPage: {
    type: 'number',
    description: '取得するページ数',
    default: 0,
    parse: v => z.number().min(0).parse(v)
  },
  output: {
    type: 'string',
    description: 'ファイル名を指定したい場合 ex:test.csv',
    default: 'output.csv',
    parse: v => z.string().regex(/.+\.csv$/).parse(v)
  },
  fields: {
    type: 'string',
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

define({
  name: 'greeter',
  description: 'A simple greeting CLI',
  args,
  run: async (ctx) => {
    await main(ctx.values)
  }
})

export type Ctx = CommandContext<typeof args>
export type Config = Ctx['values']