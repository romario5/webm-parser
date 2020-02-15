# WebM parser for JavaScript
This library for parsing WebM video that also can be recorded in browser using `MediaRecorder` API.

Usage:
``` JavaScript

// Create media recorder
let recorder = new MediaRecorder(stream, {
    videoBitsPerSecond : 1500000,
    mimeType : 'video/webm; codecs=vp8,opus'
});

// Data handler
recorder.ondataavailable = async event => {   
    let chunk = event.data;

    // Parse video chunk
    let webM = new WebM();
    webM.parse(chunk);

    console.log(webM);
};

// Start recording
recorder.start();
```

An another example shows how to get information about cluster that can be received from the server:
``` JavaScript
// Connection to server
let ws = new WebSocket('ws://server-url');

// Lets imagine that we will receive WebM clusters...
ws.onmessage = function(clusterBlob) {
    clusterBlob.arrayBuffer().then(buffer => {
        let bytes = new Uint8Array(buffer);

        // Create cluster instance and parse given bytes.
        let cluster = new WebMCluster();
        cluster.parse(bytes);

        // Retrieve timestamp of the cluster.
        console.log(cluster.timestamp.value);
    });
};
```