import { exec } from "child_process";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Video } from "../model/video.Model.js";
import { deleteDir } from "../helper/deleteFiles.js";

const UploadVideo = async (req, res) => {
  try {
    const vPath = req.files.video[0];
    const subtitle = req.files.subtitle[0];
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "requred all field",
      });
    }
    const lessonId = uuidv4();
    const videoPath = vPath.path;
    const outputPath = `./uploads/courses/${lessonId}`;
    const hlsPath = `${outputPath}/index.m3u8`;
    const up = "./uploads";
    const su = "./subtitles";

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // FFmpeg command
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

    // Execute FFmpeg command
    let videoUrl;
    exec(ffmpegCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`FFmpeg error => : ${error}`);
        res
          .status(500)
          .json({ message: "Error converting video to HLS format" });
        return;
      }
      videoUrl = `http://localhost:6969/uploads/courses/${lessonId}/index.m3u8`;

      try {
        let saveVideo = new Video({
          title: title,
          description: description,
          lessonId: lessonId,
          videoUrl: videoUrl,
          subtitles: subtitle.path,
        });
        saveVideo.save();
        //here deleting both segemnt and index file
        deleteDir(outputPath);
        //here deleting ther origin vidoe file
        deleteDir(up);
        deleteDir(su);

        res.json({
          message: "Video converted to HLS format",
          videoDetails: saveVideo,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "failed to save in db",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "failed to upload video",
    });
  }
};

export { UploadVideo };
