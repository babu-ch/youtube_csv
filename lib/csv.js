const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = class CSV {
  constructor(filePath, header) {
    this.csvWriter = createCsvWriter({
      path: filePath,
      header,
      append: !!global.options.pageToken
    })
  }

  async write(data) {
    await this.csvWriter.writeRecords(data)
  }
}