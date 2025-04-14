module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          "PYTORCH_MPS_HIGH_WATERMARK_RATIO": "0.0"
        },
        path: "app",
        message: [
          "{{platform === 'win32' && gpu === 'amd' ? 'python infer-web.py --dml --noautoopen --colab' : 'python infer-web.py --noautoopen --colab'}}",
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[0].split(':').pop()}}"
      }
    }
  ]
}
