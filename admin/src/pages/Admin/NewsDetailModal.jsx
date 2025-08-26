import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaUser, FaTag, FaStar, FaTimes, FaShare, FaBookmark, FaHeart } from 'react-icons/fa'

export const NewsDetailModal = ({ news, onClose }) => {
  return (
    <AnimatePresence>
      {news && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden flex flex-col overflow-y-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* HEADER IMAGE + CLOSE BUTTON */}
            <div className="relative">
              <motion.img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-80 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8 flex flex-col gap-6">
              {/* Title */}
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-800 leading-snug">
                {news.title}
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaUser size={16} /> {news.author}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt size={16} /> {new Date(news.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FaTag size={16} /> {news.category}
                </span>
                {news.isFeatured && (
                  <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                    <FaStar size={16} /> Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {news.description}
              </p>

              {/* Extras: Tags/Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm shadow-sm">
                  Health Update
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm shadow-sm">
                  Community
                </span>
                <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm shadow-sm">
                  Trending
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-between items-center pt-6 border-t gap-4">
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>

                <div className="flex gap-3">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <FaHeart size={18} className="text-red-500" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <FaBookmark size={18} className="text-blue-500" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <FaShare size={18} className="text-green-500" />
                  </button>
                </div>
              </div>

              {/* Suggested Reads */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">📌 Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="border rounded-xl shadow-sm hover:shadow-lg transition bg-gradient-to-br from-white to-gray-50 p-4 flex flex-col gap-3"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={`https://picsum.photos/seed/news-${i}/400/200`}
                        alt="related"
                        className="rounded-lg h-32 w-full object-cover"
                      />
                      <h4 className="text-lg font-bold text-gray-800">
                        Related News Title {i}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Short description of the related article to encourage the user to explore
                        more hospital and medical updates…
                      </p>
                      <button className="text-blue-600 hover:underline text-sm mt-auto self-start">
                        Read More →
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
