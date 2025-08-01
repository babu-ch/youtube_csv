# CLI Usage

```sh
This is a tool to convert videos from a specific YouTube channel into CSV. (youtube_csv v1.0.0)
USAGE:
  youtube_csv <OPTIONS> <channelId>

ARGUMENTS:
  channelId           取得するチャンネルのID

OPTIONS:
  --waitMs [waitMs]                  1回取得ごとにsleepするms (default: 100)
  --pageToken <pageToken>            pageToken 前回の続きからデータ取得する場合 (default: )
  --maxPage <maxPage>                取得するページ数 (default: 0)
  --output [output]                  ファイル名を指定したい場合 ex:test.csv (default: output.csv)
  --fields [fields]                  取得するフィールド カラム名:アクセスするフィールド をカンマ区切りで指定 (default: id:snippet.resourceId.videoId,title:snippet.title,description:snippet.description,thumbnail:snippet.thumbnails.default.url,published:snippet.publishedAt)
  --playListId <playListId>          playlistのid. 指定時はchannelを無視 (default: )
  -h, --help                         Display this help message
  -v, --version                      Display this version

EXAMPLES:
  
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
  

```