

let recorder_options = document.getElementsByName("recorder_options");
let color_picker = document.getElementsByName("color_picker");
let embedUrl;
let btn = document.getElementById('submit-video-btn');

const eventsElement = document.getElementById("eventsContainer");

// Recorder type selection
recorder_options.forEach((option) => {
  option.addEventListener("click", () => {
    if (
      document.querySelector('input[name="recorder_options"]:checked').value ===
      "custom"
    ) {
      document.getElementById("defaultButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "none";
      document.getElementById("customButtonContainer").style.display = "block";
    } else if (
      document.querySelector('input[name="recorder_options"]:checked').value ===
      "inline"
    ) {
      document.getElementById("customButtonContainer").style.display = "none";
      document.getElementById("defaultButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "block";
    } else {
      document.getElementById("customButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "none";
      document.getElementById("defaultButtonContainer").style.display = "block";
    }
  });
});



// This will be called once the recorder has been loaded.
window.hippoWidget.onLoad(function () {
  // Recorder loading has been completed. You can enable your custom button now.
//   document.getElementById("screenRecord").addEventListener("click", () => {
//     let recordingConfiguration = {
//       screenRecord: true,
//       audio: true,
//       webCam: false,
//       systemAudio: true,
//       resolution: "1080",
//       separateLayer: false,
//       initiator: "generic_embed"
//     };
//     window.hippoWidget.startRecording(recordingConfiguration);
//   });
  document.getElementById("webcamRecord").addEventListener("click", () => {
    let recordingConfiguration = {
      screenRecord: false,
      audio: true,
      webCam: true,
    //   teleprompter: true, 
      // teleprompter_script_id: 151941,
      showPreview: true,
      systemAudio: true,
      resolution: "1080",
      separateLayer: false,
      initiator: "generic_embed"
    };
    window.hippoWidget.startRecording(recordingConfiguration);
  });


  // Recorder event listeners
  window.hippoWidget.on("record_initiated", (e) => {
    embedUrl = e.embed_url;
    
    document.getElementById("iframeContainer").innerHTML = "";
    printEvent(e);
   
  });

  window.hippoWidget.on("video_submitted", (e) => {
    let url = document.getElementById("url")
url.innerText=embedUrl
    let iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.width = "600px";
    iframe.height = "500px";
    iframe.style = "border: none";
    document.getElementById("iframeContainer").appendChild(iframe);
    printEvent(e);
  });

  window.hippoWidget.on("record_stopped", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("record_aborted", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("record_error", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("video_cancelled", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("import_progress", (e) => {
    document.getElementById("iframeContainer").innerHTML = "";
    printEvent(e);
  });



  window.hippoWidget.on("source_uploaded", (e) => {
    printEvent(e);
   
  });
});

function printEvent(event) {
  let elem = document.createElement("p");
  elem.innerHTML = JSON.stringify(event);
  eventsElement.appendChild(elem);

}



