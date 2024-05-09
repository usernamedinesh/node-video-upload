import mongoose from "mongoose";

const videoSubtitle = new mongoose.Schema({
  language: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
    // required: true,
  },
});

const videoSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  videoUrl: {
    type: String,
    requried: true,
  },

  subtitles: [videoSubtitle],
  createdAt: { type: Date, default: Date.now },
});

const Video = new mongoose.model("video", videoSchema);
export { Video };
