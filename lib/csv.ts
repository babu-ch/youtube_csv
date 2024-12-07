import {createObjectCsvWriter} from "csv-writer"
import {config} from "./config"
import {ObjectStringifierHeader} from "csv-writer/src/lib/record";
import {CsvWriter} from "csv-writer/src/lib/csv-writer";
import {ObjectMap} from "csv-writer/src/lib/lang/object";

export default class CSV {

  private csvWriter: CsvWriter<ObjectMap<any>>;
  constructor(filePath:string, header:ObjectStringifierHeader) {
    this.csvWriter = createObjectCsvWriter({
      path: filePath,
      header,
      append: !!config.options.pageToken
    })
  }

  async write(data:ObjectMap<any>[]) {
    await this.csvWriter.writeRecords(data)
  }
}