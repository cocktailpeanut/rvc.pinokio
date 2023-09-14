const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
  title: "RVC",
  description: "1 Click Installer for Retrieval-based-Voice-Conversion-WebUI (https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "app", "env"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "start.js",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running",
        type: "label",
        href: "start.js"
      }, {
        when: "start.js",
        off: "<i class='fa-solid fa-power-off'></i> Launch",
        href: "start.js?fullscreen=true&run=true",
      }, {
        when: "start.js",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "start.js",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start.js?fullscreen=true"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        type: "link",
        href: "install.js?run=true&fullscreen=true"
      }]
    }
  }
}
