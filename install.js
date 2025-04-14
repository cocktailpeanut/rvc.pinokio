module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -r ../requirements.txt"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "lj1995/VoiceConversionWebUI" ],
        "include": '"*.pth" "*.pt" "*.onnx"',
        "exclude":'"rmvpe.onnx" "rmvpe.pt" "hubert_base.pt"',
        "local-dir": "assets"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "lj1995/VoiceConversionWebUI", "hubert_base.pt" ],
        "local-dir": "assets/hubert"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "lj1995/VoiceConversionWebUI", "rmvpe.pt", "rmvpe.onnx" ],
        "local-dir": "assets/rmvpe"
      }
    }
  ]
}