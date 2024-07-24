import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'
import BlogDetails from './BlogDetails'

const Blogs = () => {
  const {loading,posts} = useContext(AppContext)
  // console.log("posts length",posts.length);
  return (
    <div className='w-11/12 max-w-[670px] mx-auto py-8 flex flex-col gap-y-7 mt-[60px] mb-[70px] justify-center items-center'>
      {
        loading ? 
        (<Spinner />) : 
        (
          posts.length === 0 ? 
          ( <div>
            <p>No Post Found</p>
          </div>) : 
          (posts.map((post) => (
            <BlogDetails key={post.id} post={post} />
          )))
        )
      }
    </div>
  )
}

export default Blogs