import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Top from '../components/Top.js'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [homepage, setHomepage] = useState(false)

  const location = useLocation()
  const cat = location.search

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [cat])

  return (
    <div className='mt-9 w-full z-10 max-w-[1300px]'>
        {homepage && <Top />}
        <div className='flex'>
          <div className="flex flex-col gap-10 flex-[7] border-r-[1px] border-r-gray-200">
            {posts.map(post => (
              <div className='py-4 px-6 border-b border-opacity-60'>
                {post.cat && <span className='text-white bg-black rounded-full capitalize text-xs px-2 mr-2'>{post.cat}</span>}
                <span className='text-xs font-semibold opacity-90'>{`${Math.ceil(post.content.trim().split(/\s+/).length / 225)} min to read`}</span>
                <div className='flex gap-10 flex-row-reverse h-40' key={post.id}>
                  <div className="flex-[1] relative">
                    <img src={post.img && require('../uploads/' + post.img)} alt="img" className='h-full object-cover' />
                  </div>
                  <div className="flex-[3] flex flex-col relative">
                    <h2 className='text-3xl font-semibold py-3'>{post.title}</h2>
                    <div class='text-lg font-regular' dangerouslySetInnerHTML={{__html: post?.content.length > 100 ? post.content.slice(0,100) + '...' : post.content}}></div>
                    <Link className='absolute bottom-1' to={`post/${post.id}`}>
                      <button className='w-max underline text-darkSecondary hover:text-black hover:bg-lightOrange delay-100 rounded-md hover:text-darkOrange hover:border-lightOrange'>Read More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-[4]">
            <div className='flex flex-col pt-4'>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=personal'>PERSONAL</Link>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=humour'>HUMOUR</Link>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=relationship'>RELATIONSHIP</Link>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=mystery'>MYSTERY</Link>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=fantasy'>FANTASY</Link>
                <Link className='nav-item no-underline color-inherit font-regular text-md' to='/?cat=confession'>CONFESSION</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
