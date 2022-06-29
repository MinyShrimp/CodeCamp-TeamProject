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

    res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'video/mp4',
    });
    fs.createReadStream(fullPath).pipe(res);
});

app.listen(8500, '0.0.0.0', () => {
    console.log(`
################################################
🛡️  Server listening on port: 8500 🛡️
################################################`);
});
