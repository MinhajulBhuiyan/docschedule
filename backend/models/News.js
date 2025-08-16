import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Hospital', 'Medical'],
      default: 'Hospital',
      index: true
    },
    author: {
      type: String,
      default: 'Admin'
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model('News', NewsSchema)