## usage

```sh
cp .env.example .env

.envにAPIキー設定

npm i

# maxPage=1でお試し
npm run start -- <channelId> --maxPage=1

# 全動画取得
npm run start -- <channelId>
```

# option

```sh
npm run start -- --help
````


# ex

```sh
# pageTokenを指定してページの途中から取得(append)
node run start -- <ch> --output=test.csv --pageToken=token --maxPage=5

# 取得フィールドを変更
# フィールドはこちらから確認 https://developers.google.com/youtube/v3/docs/playlistItems?hl=ja#resource
node run start -- <ch> --output=test.csv --maxPage=1 --fields=id:snippet.resourceId.videoId,title:snippet.title,published:snippet.publishedAt
```
