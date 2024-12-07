import z from "zod";
import {Command} from "commander"

const program = new Command()
program
  .arguments("<requiredArg>")
  .option("--waitMs <waitMs>", "1回取得ごとにsleepするms", (val) => parseInt(val, 10),100)
  .option("--pageToken <pageToken>", "pageToken 前回の続きからデータ取得する場合", "")
  .option("--maxPage <maxPage>", "取得するページ数", (val) => parseInt(val, 10),0)
  .option("--output <output>", "ファイル名を指定したい場合 ex:test.csv", "output.csv")
  .option("--fields <fields>", "取得するフィールド カラム名:アクセスするフィールド をカンマ区切りで指定", "id:snippet.resourceId.videoId,title:snippet.title,thumbnail:snippet.thumbnails.default.url")
program.parse(process.argv);

const schema = z.object({
  waitMs: z.number(),
  pageToken: z.string(),
  maxPage: z.number(),
  output: z.string().regex(/.+\.csv$/),
  fields: z.string().regex(/^(\w+:[\w.]+,?)+$/),
})

const options:Options = program.opts()

schema.parse(options)

export type Options = {
  waitMs: number;
  pageToken: string;
  maxPage: number;
  output: string;
  fields: string;
}

export default {
  channelId:   program.args[0],
  options
}