
require "fast-csv"
require "fs"
require "process"

fs.createReadStream process.stdin
.pipe csv()
.on "data", (data) ->
  console.log data
