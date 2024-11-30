const { Command } = require('commander')

const program = new Command()
program
  .arguments("<requiredArg>")
  .option("--waitMs <waitMs>", "1回取得ごとにsleepするms", 100)
  .option("--pageToken <pageToken>", "pageToken 前回の続きからデータ取得する場合", "")
  .option("--maxPage <maxPage>", "取得するページ数", 0)
  .option("--output <output>", "ファイル名を指定したい場合 ex:test.csv", "output.csv")
  .option("--fields <fields>", "取得するフィールド カラム名:アクセスするフィールド をカンマ区切りで指定", "id:id.videoId,title:snippet.title,thumbnail:snippet.thumbnails.default.url")
program.parse(process.argv);

// オプション引数の取得
const options = program.opts();

global.channelId = program.args[0]
global.options = options