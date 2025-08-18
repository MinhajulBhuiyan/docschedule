import React from 'react'
import { motion } from 'framer-motion'

export const NewsDetailModal = ({ news, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* header */}
        <div className="relative">
          <img src={news.imageUrl} alt={news.title} className="w-full h-72 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full"
          >
            ✖
          </button>
        </div>

        {/* body */}
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{news.title}</h2>
          <div className="flex gap-3 text-sm">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{news.category}</span>
            {news.isFeatured && (
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">⭐ Featured</span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            By {news.author} • {new Date(news.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{news.description}</p>
        </div>

        {/* footer */}
        <div className="p-6 border-t flex justify-end gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Edit</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
