const { manifest } = require("../package.js")
const { random } = require("./util")
const Path = require("path")

module.exports = async function packBerial(asset, options) {
  const edir = Path.resolve(Path.dirname(options.e))

  asset.output.jsx = String(asset.output.jsx)

  const path = asset.path
    .replace(edir, "")
    .replace(/\\/g, "/")
    .replace(".json", "")

  const prefix = options.p ? options.p : "/"
  const basename = options.p ? `${"/" + Path.basename(options.p)}` : ""
  const hash = prefix + asset.hash
  manifest.push({
    id: asset.id,
    info: asset.ast,
    scripts: [hash + ".js", hash + ".jsx"],
    styles: [hash + ".css"],
    path: `${basename + path}`,
  })
}