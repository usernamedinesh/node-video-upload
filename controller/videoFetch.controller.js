import { Video } from "../model/video.Model.js";

const fetchVideo = async (req, res) => {
  try {
    const videos = await Video.find({});
    if (!videos || videos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no videos found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "video fetch successfully",
      vidoes: videos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "fail to fetch the video",
    });
  }
};

export { fetchVideo };
