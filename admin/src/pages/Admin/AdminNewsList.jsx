import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
import { AdminContext } from '../../context/AdminContext'
import { NewsDetailModal } from './NewsDetailModal'
import { motion } from 'framer-motion'
import { BadgeCheck, Calendar, Edit, Eye, Trash2 } from 'lucide-react'

const AdminNewsList = () => {
  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const [newsList, setNewsList] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  // fetch news
  const fetchNews = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/news/all', { headers: { aToken } })
      if (data.success) {
        setNewsList(data.data)
        setFilteredNews(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  // filter + search
  useEffect(() => {
    let temp = [...newsList]
    if (filterCategory !== 'All') {
      temp = temp.filter(n => n.category === filterCategory)
    }
    if (search.trim() !== '') {
      temp = temp.filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredNews(temp)
  }, [search, filterCategory, newsList])

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          📰 Manage News
        </motion.h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl shadow-md focus:outline-none w-72 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border px-3 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Categories</option>
            <option value="Hospital">Hospital</option>
            <option value="Medical">Medical</option>
          </select>
        </div>
      </div>

      {/* grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-2xl shadow-inner"></div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <p className="text-gray-500 text-lg">No news found</p>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredNews.map((news, idx) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group border rounded-2xl shadow-lg hover:shadow-2xl bg-white overflow-hidden flex flex-col hover:border-blue-400 transition"
            >
              <div className="relative">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                />
                {news.isFeatured && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow gap-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-1">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {news.description}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t">
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> 
                    {new Date(news.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* footer actions */}
              <div className="px-5 py-3 flex justify-between items-center bg-gray-50 border-t">
                <button
                  onClick={() => setSelectedNews(news)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Eye size={16}/> View
                </button>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    <Edit size={16}/> Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <Trash2 size={16}/> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* detail modal */}
      {selectedNews && (
        <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  )
}

export default AdminNewsList
