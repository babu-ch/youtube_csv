import { expect, test } from "vitest"
import {parseCLI, config, Config} from "../lib/config"

const baseArg = ["node", "index.ts", "ch"];

test("channel以外の引数がない場合デフォ値が使用される", () => {
  parseCLI(baseArg)
})

test("引数が変なときバリデーションエラー", () => {
  const args = [
    ["--waitMs", "test"],
    ["--waitMs", "-1"],
    ["--waitMs", "0"],
    ["--maxPage", "test"],
    ["--maxPage", "-1"],
    ["--output", "test.tsv"],
    ["--output", "test"],
    ["--fields", "test"],
  ]
  args.forEach((arg) => {
    expect(() => parseCLI([...baseArg, ...arg])).toThrowError()
  })
})

test("引数が正しいときエラーなし", () => {
  const args = [
    ["--waitMs", "200"],
    ["--maxPage", "2"],
    ["--output", "test.csv"],
    ["--fields", "id:id,createdAt:snippet.createdAt"],
  ]
  args.forEach((arg) => {
    parseCLI([...baseArg, ...arg])
    const key = (arg[0].replace("--", "") as keyof Config["options"])
    const value = arg[1].match(/^\d+$/) ? Number(arg[1]) : arg[1]
    expect(config.options[key]).toBe(value)
  })
})