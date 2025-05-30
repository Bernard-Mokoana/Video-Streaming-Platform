import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
  videoFile: {
    type: String,
    required: true,
  },
  thumbnailFile: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

videoSchema.plugin(mongooseAggregatePaginate);

export const Videos = mongoose.model("Video", videoSchema);
