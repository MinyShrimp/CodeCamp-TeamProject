import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.get('/view/:name', (req: Request, res: Response) => {
    const { name } = req.params;

    res.render('video', {
        title: name,
        videoSource: `../video/${name}`,
    });
});

app.get('/video/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const fullPath = `video/${name}.mp4`;
    const fileStat = fs.statSync(fullPath);
    const { size } = fileStat;
    const { range } = req.headers;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : size - 1;
        const chunk = end - start + 1;
        const stream = fs.createReadStream(fullPath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunk,
            'Content-Type': 'video/mp4',
        });
        stream.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4',
        });
        fs.createReadStream(fullPath).pipe(res);
    }
});

app.listen(8500, '0.0.0.0', () => {
    console.log(`
################################################
🛡️  Server listening on port: 8500 🛡️
################################################`);
});
