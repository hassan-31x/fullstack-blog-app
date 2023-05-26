import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/authContext.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'

const Write = () => {
  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)
  if (!currentUser) navigate('/login')

  const state = useLocation().state

  const [title, setTitle] = useState(state?.title || '')
  const [description, setDescription] = useState(state?.content ||'')
  const [img, setImg] = useState(null)
  const [cat, setCat] = useState(state?.cat || '')

  const [blogId, setBlogId] = useState(0)


  useEffect(() => {
    setTimeout(() => {
      if (blogId) {
          navigate(`/post/${blogId}`)
      }
    }, 2000);
}, [blogId]);

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', img)
      const res = await axios.post('/upload', formData)
      return res.data
    }
    catch (err) {
      console.log(err)
    }
  }

  // const handleSubmit = async e => {
  //   e.preventDefault()

  //   try {
  //     await axios.post(`/posts/`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleSubmit = async e => {
    e.preventDefault()
    
    try {
      if (state) {
        await axios.put(`/posts/${state.id}`, {
          // title, content: description, cat, img: 'url'
          title, content: description, cat
      }).then(navigate(`/post/${state.id}`))}
      else {
        const url = await upload()
        await axios.post(`/posts/`, {
            title, content: description, cat, img: img ? url : '', date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }).then(res => setBlogId(res.data.blogId))}
} catch (error) {
    console.log(error)
}
}

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-6 max-w-[1300px]">

      <div className="flex-[5] flex flex-col gap-4">
        <input type="text" placeholder='Title' className='py-4 px-5 border-2 border-black focus:ring-darkOrange text-2xl rounded-md bg-lightPrimary' value={title} onChange={e => setTitle(e.target.value)}/>
        <ReactQuill theme='snow' value={description} onChange={setDescription} className='h-[400px] border-2 border-black focus:ring-darkOrange'></ReactQuill>
      </div>

      <div className="flex-[2] flex flex-col gap-6 mt-8 lg:mt-0">
        <div className="item1 border border-black rounded-[4px] py-3 px-2">
          <h3 className='text-xl font-bold opacity-90 mb-2'>Publish</h3>
          <span><b>Status: </b>Draft</span><br />
          <span><b>Visibility: </b>Public</span><br />
          {!state && <label className='underline cursor-pointer mb-2'>
            <input type="file" className='hidden' onChange={e => setImg(e.target.files[0])} />
          Upload Image</label>}
          <div className="flex justify-between">
            <button className='py-1 px-2 border rounded-md mt-2 border-darkSecondary bg-lightPrimary text-darkSecondary hover:bg-secondaryColor drop-shadow-[2px_2px_0px_rgba(72,71,254,1)]'>Save as draft</button>
            <button className='py-1 px-2 border mt-2 rounded-md border-black bg-darkSecondary hover:bg-secondaryColor text-white hover:text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]' onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="flex flex-col border border-black rounded-[4px] py-3 px-2 justify-between">
          <h3 className='text-xl font-bold opacity-90 mb-2'>Category</h3>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='personal' id='personal' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'personal'} />Personal</label>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='humour' id='humour' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'humour'} />Humour</label>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='relationship' id='relationship' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'relationship'} />Relationship</label>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='mystery' id='mystery' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'mystery'} />Mystery</label>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='fantasy' id='fantasy' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'fantasy'} />Fantasy</label>
          <label className='selected:bg-lightOrange py-1 px-2'><input type="radio" name='cat' value='confession' id='confession' className='mr-1' onChange={e => setCat(e.target.value)} checked={cat === 'confession'} />Confession</label>
        </div>
      </div>

    </div>
  )
}

export default Write
