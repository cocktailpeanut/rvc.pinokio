module.exports = async (kernel) => {
  let hubert = [{
    url: "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt",
    path: "app/assets/hubert/hubert_base.pt"
  }]

  let pretrained = [
    "pretrained/D32k.pth",
    "pretrained/D40k.pth",
    "pretrained/D48k.pth",
    "pretrained/G32k.pth",
    "pretrained/G40k.pth",
    "pretrained/G48k.pth",
    "pretrained/f0D32k.pth",
    "pretrained/f0D40k.pth",
    "pretrained/f0D48k.pth",
    "pretrained/f0G32k.pth",
    "pretrained/f0G40k.pth",
    "pretrained/f0G48k.pth",
  ].map((p) => {
    return {
      url: "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/" + p,
      path: "app/assets/" + p
    }
  })
  let uvr5_weights = [
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/HP2-%E4%BA%BA%E5%A3%B0vocals%2B%E9%9D%9E%E4%BA%BA%E5%A3%B0instrumentals.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/HP2_all_vocals.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/HP3_all_vocals.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/HP5-%E4%B8%BB%E6%97%8B%E5%BE%8B%E4%BA%BA%E5%A3%B0vocals%2B%E5%85%B6%E4%BB%96instrumentals.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/HP5_only_main_vocal.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/VR-DeEchoAggressive.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/VR-DeEchoDeReverb.pth",
    "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/VR-DeEchoNormal.pth",
  ].map((url) => {
    let filename = url.split("/").pop()
    let filepath = "app/assets/uvr5_weights/" + filename
    return {
      url,
      path: filepath
    }
  }).concat({
    url: "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/uvr5_weights/onnx_dereverb_By_FoxJoy/vocals.onnx",
    path: "app/assets/uvr5_weights/onnx_dereverb_By_FoxJoy/vocals.onnx"
  })

  let pretrained2 = [
    "pretrained_v2/D32k.pth",
    "pretrained_v2/D40k.pth",
    "pretrained_v2/D48k.pth",
    "pretrained_v2/G32k.pth",
    "pretrained_v2/G40k.pth",
    "pretrained_v2/G48k.pth",
    "pretrained_v2/f0D32k.pth",
    "pretrained_v2/f0D40k.pth",
    "pretrained_v2/f0D48k.pth",
    "pretrained_v2/f0G32k.pth",
    "pretrained_v2/f0G40k.pth",
    "pretrained_v2/f0G48k.pth",
  ].map((p) => {
    return {
      url: "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/" + p,
      path: "app/assets/" + p
    }
  })
  let models = hubert.concat(pretrained).concat(uvr5_weights).concat(pretrained2).map((c) => {
    return {
      "method": "fs.download",
      "params": c
    }
  })


  return {
    "requires": [{
      "type": "conda",
      "name": "ffmpeg",
      "args": "-c conda-forge"
    }],
    "run": [{
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI app"
      }
    }, {
      "method": "shell.run",
      "params": {
        "message": "{{os.platform() === 'win32' ? 'python' : 'python3'}} -m venv env",
        "path": "app"
      }
    }, {
      "method": "shell.start",
      "params": {
        "path": "app"
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
        "message": "npx --yes torchcraft@0.0.16",
        "on": [{
          "event": null,
          "return": true
        }]
      }
    }, {
      "method": "shell.enter",
      "params": {
        "message": "pip install -r torchcraft.txt",
        "on": [{
          "event": null,
          "return": true
        }]
      }
    }, {
      "method": "shell.enter",
      "params": {
        "message": "pip install -r requirements.txt",
        "on": [{
          "event": null,
          "return": true
        }]
      }
    }].concat(models).concat([{
      "method": "input",
      "params": {
        "title": "Install Success",
        "description": "Go back to the dashboard and launch the app!"
      }
    }, {
      "method": "browser.open",
      "params": {
        "uri": "/?selected=RVC"
      }
    }])
  }
}
