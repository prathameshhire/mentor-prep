"use client"
import { ActionIcon, Avatar, rem } from '@mantine/core'
import { IconArrowBigDown, IconArrowBigUp } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { formatUpdatedAt } from '../QuestionCard';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  isMentor: boolean;
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Author {
  profile: Profile;
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Contact {
  phone: string;
}

interface Profile {
  contact: Contact;
  name: string;
  bio: string;
}



const Card = ({ post, getData }: { post: Post, getData:() => Promise<void> }) => {
  const authtoken = localStorage.getItem("authtoken")
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleUpVote = async () =>{
    try {
      const response = await axios.put(`https://mentor-prep-rest-api.onrender.com/api/v1/posts/${post._id}`, {vote:1},{
        headers:{
          "auth-token":authtoken
        }
      });
      setDataUpdated(true);
    } catch (error) {
      console.error('Error fetching Card data:', error);
    }
  }
  
  const handleDownVote = async () =>{
    try {
      const response = await axios.put(`https://mentor-prep-rest-api.onrender.com/api/v1/posts/${post._id}`, {vote:-1},{
        headers:{
          "auth-token":authtoken
        }
      });
      setDataUpdated(true);
    } catch (error) {
      console.error('Error fetching Card data:', error);
    }
  }

  useEffect(() => {
    setDataUpdated(false);
  }, [post]); // Reset dataUpdated when post changes

  // useEffect to fetch data when dataUpdated is true
  useEffect(() => {
    if (dataUpdated) {
      getData();
    }
  }, [dataUpdated, getData]);

  return (
    <div className='border-2 border-[#EAEAEA] h-fit flex flex-col gap-3 p-4 w-[800px] rounded-md shadow-md'>
      <div className='flex justify-between'>
        <div className='SECTION-1 flex gap-3 items-center'>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="lg"
        />
        <h2>{post.author.profile.name}</h2>
        </div>
        <div className='flex gap-1'>
          <span className='italic'>Posted on-</span> 
          <span className='italic'>{formatUpdatedAt(post?.createdAt)}</span> 
        </div>
      </div>
        <div className='SECTION-2'>
            <h3 className='font-semibold'>{post.title}</h3>
            <p>{post.content}</p>
        </div>
        <div className='SECTION-3 flex justify-between'>
            <div className='flex gap-2'>
              {post.tags.map((tag,id)=>{
                  return(
                  <span className="bg-gray-200 px-2 py-[2px] rounded-xl" key={id}>{tag}</span>)
                })
              }
                
            </div>
            <div className='flex gap-2'>
              <ActionIcon size="lg" color="green" variant="subtle" onClick={()=>{handleUpVote()}}>
                <IconArrowBigUp style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
                <h2>{post.upvotes}</h2>
              </ActionIcon>
              <ActionIcon size="lg" color="red" variant="subtle" onClick={()=>{handleDownVote()}}>
                <IconArrowBigDown style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
                <h2>{post.downvotes}</h2>
              </ActionIcon>
            </div>
        </div>
    </div>
  )
}

export default Card