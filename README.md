## usage

```sh
cp .env.example .env

.envにAPIキー設定

npm i

node index.js <channelId> --maxPage=1

# 全部取得するならmaxPageを外す
node index.js <channelId>
```

# option

```sh
node index.js --help
```

# ex

```sh
# pageTokenを指定してページの途中から取得(append)
node index.js <ch> --output=test.csv --pageToken=token --maxPage=5

# 取得フィールドを変更
# フィールドはこちらから確認 https://developers.google.com/youtube/v3/docs/playlistItems?hl=ja#resource
node index.js <ch> --output=test.csv --maxPage=1 --fields=id:snippet.resourceId.videoId,title:snippet.title,published:snippet.publishedAt
```
