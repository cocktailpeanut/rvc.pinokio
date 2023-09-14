const os = require('os')
module.exports = async (kernel) => {
  let env = {
    "HF_HOME": "./huggingface",
  }
  if (os.platform() === 'darwin') {
    env.PYTORCH_ENABLE_MPS_FALLBACK = "1",
    env.PYTORCH_MPS_HIGH_WATERMARK_RATIO = "0.0"
  }
  return {
    "run": [{
      "method": "shell.start",
      "params": {
        "path": "app",
        "env": env
      }
    }, {
      "method": "shell.enter",
      "params": {
        "message": "{{os.platform() === 'win32' ? 'env\\\\Scripts\\\\activate' : 'source env/bin/activate'}} env",
        "on": [{
          "event": null,
          "return": true
        }]
      }
    }, {
      "method": "shell.enter",
      "params": {
        "message": "{{os.platform() === 'win32' ? 'python' : 'python3'}} infer-web.py",
        "on": [{
          "event": "/(http:\/\/[0-9.:]+)/",
          "return": "{{event.matches[0][1]}}"
        }]
      }
    }, {
      "method": "self.set",
      "params": {
        "session.json": {
          "url": "{{input}}"
        }
      }
    }, {
      "method": "browser.open",
      "params": {
        "uri": "{{self.session.url}}",
        "target": "_blank"
      }
    }, {
      "method": "process.wait" 
    }]
  }
}
