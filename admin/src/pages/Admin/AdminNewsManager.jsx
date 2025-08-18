import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AdminNewsManager = () => {

    const [newsImg, setNewsImg] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [newsList, setNewsList] = useState([])

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    // Fetch news
 // Fetch news
const fetchNews = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/news/all', {
            headers: { aToken }
        })
        if (data.success) {
            // ✅ your backend returns "data", not "news"
            setNewsList(data.data)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error('Failed to fetch news')
    }
}

    useEffect(() => {
        fetchNews()
    }, [])

    // Submit handler
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!newsImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()
            formData.append('image', newsImg)
            formData.append('title', title)
            formData.append('content', content)

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            const { data } = await axios.post(backendUrl + '/api/admin/add-news', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setContent('')
                setNewsImg(false)
                fetchNews()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong while adding news')
            console.log(error)
        }
    }

    // Delete news
    const removeNews = async (newsId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/remove-news', { id: newsId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                fetchNews()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Failed to remove news')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Manage News</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                {/* Image Upload */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="news-img">
                        <img
                            className='w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer'
                            src={newsImg ? URL.createObjectURL(newsImg) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input onChange={(e) => setNewsImg(e.target.files[0])} type="file" id="news-img" hidden />
                    <p>Upload news <br /> image</p>
                </div>

                {/* Title + Content */}
                <div className='flex flex-col gap-6 text-gray-600'>

                    <div className='flex flex-col gap-1'>
                        <p>News Title</p>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            className='border rounded px-3 py-2'
                            type="text"
                            placeholder='Enter news title'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>News Content</p>
                        <textarea
                            onChange={e => setContent(e.target.value)}
                            value={content}
                            className='w-full px-3 pt-2 border rounded'
                            rows={5}
                            placeholder='Write news content here'
                            required
                        ></textarea>
                    </div>

                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-6 text-white rounded-full'>Add News</button>
            </div>

            {/* Existing News List */}
          {/* Existing News List */}
<div className='bg-white px-8 py-6 border rounded w-full max-w-5xl mt-6'>
    <p className='mb-4 text-lg font-medium'>Existing News</p>

    {newsList.length === 0 ? (
        <p className="text-gray-500">No news found</p>
    ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {newsList.map((news) => (
                <div key={news._id} className='border rounded-lg shadow-sm overflow-hidden bg-gray-50'>
                    
                    {/* Image */}
                    <img 
                        src={news.imageUrl} 
                        alt={news.title} 
                        className='w-full h-40 object-cover'
                    />

                    {/* Content */}
                    <div className='p-4 flex flex-col gap-2'>
                        {/* Title + Badges */}
                        <div className='flex items-center justify-between'>
                            <h4 className='text-lg font-semibold line-clamp-1'>{news.title}</h4>
                            <div className='flex gap-2'>
                                <span className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700'>
                                    {news.category}
                                </span>
                                {news.isFeatured && (
                                    <span className='px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700'>
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-gray-600 line-clamp-3'>
                            {news.description}
                        </p>

                        {/* Footer Row */}
                        <div className='flex items-center justify-between mt-3 text-xs text-gray-500'>
                            <p>By {news.author || "Admin"}</p>
                            <p>{new Date(news.createdAt).toLocaleDateString()}</p>
                        </div>

                        {/* Delete button */}
                        <button
                            onClick={() => removeNews(news._id)}
                            type="button"
                            className='mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 self-start'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>


        </form>
    )
}

export default AdminNewsManager
