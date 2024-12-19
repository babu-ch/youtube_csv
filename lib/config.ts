import z from "zod";
import {Command} from "commander"

export function createCLI() {
  const program = new Command()
  program
    .arguments("<requiredArg>")
    .option("--waitMs <waitMs>", "1回取得ごとにsleepするms", (val) => parseInt(val, 10),100)
    .option("--pageToken <pageToken>", "pageToken 前回の続きからデータ取得する場合", "")
    .option("--maxPage <maxPage>", "取得するページ数", (val) => parseInt(val, 10),0)
    .option("--output <output>", "ファイル名を指定したい場合 ex:test.csv", "output.csv")
    .option("--fields <fields>", "取得するフィールド カラム名:アクセスするフィールド をカンマ区切りで指定", "id:snippet.resourceId.videoId,title:snippet.title,description:snippet.description,thumbnail:snippet.thumbnails.default.url,published:snippet.publishedAt")
    // memo 指定時channel無視するなら全部optionにした方がいいか...
    .option("--playListId <playListId>", "playlistのid. 指定時はchannelを無視", "")
  return program
}

const schema = z.object({
  waitMs: z.number().positive(),
  pageToken: z.string(),
  maxPage: z.number().min(0),
  output: z.string().regex(/.+\.csv$/),
  fields: z.string().regex(/^(\w+:[\w.]+,?)+$/),
  playListId: z.string(),
})

export type Config = {channelId:string; options:z.infer<typeof schema>}
export let config:Config

export function parseCLI(argv: string[]) {
  const program = createCLI()
  program.parse(argv);

  config = {
    channelId: program.args[0],
    options: schema.parse(program.opts()),
  };
}