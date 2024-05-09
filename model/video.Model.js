import mongoose from "mongoose";

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

  subtitles: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Video = new mongoose.model("video", videoSchema);
export { Video };
