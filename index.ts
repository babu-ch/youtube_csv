import {cli} from "gunshi";
import {command} from "./lib/command";

await cli(process.argv.slice(2), command)
