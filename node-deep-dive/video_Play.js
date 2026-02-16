const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
      
    const videoPath  = path.join(__dirname ,  'video.mp4');

    fs.stat(videoPath , (err , stats)=>{
        if(err){
            console.error('File not found');
            res.writeHead(404 , {'Content-Type': 'text/plain'});
            res.end("File not found");
            return ;
        }

        const videoSize =  stats.size;
        const range  = req.headers.range;

        if(!range){
            res.writeHead(200 , {
                'Content-Length' : videoSize,
                'Content-Type' : 'video/mp4'
            });
            fs.createReadStream(videoPath).pipe(res);
            return ;
        }
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`, // Format: bytes START-END/TOTAL
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    })
     
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
