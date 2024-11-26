import express, { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express()
app.use(express.json())

app.post('/process-video', (req: Request, res: Response) => {

    //retrive the file path fo the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    //check for file path correctness
    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path');
    }

    //create the ffmpeg command
    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360') //360P output
        .on('end', function () {
            console.log('Processing finished successfully');
            res.status(200).send('Processing finished sucessfully');
        })
        .on('error', function (err: any) {
            console.log('An error occurred: ' + err.message);
            res.status(500).send('An error occurred: ' + err.message);
        })
        .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});