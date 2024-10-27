"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import lazyImage from '../../public/startablog.png';
import image from '../../public/image.svg'
import Card from '../Card';
import { Button, MultiSelect, TextInput, Textarea } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Community = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] as string[] });
  const authtoken = localStorage.getItem('authtoken');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mentor-prep-rest-api.onrender.com/api/v1/posts?page=1&limit=4', {
        headers: {
          'auth-token': authtoken,
        },
      });
      // console.log(response.data.data.posts);
      setPosts(response.data.data.posts);
    } catch (error) {
      console.error('Error fetching Card data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [posts]);

  const handleSend = () => {
    axios
      .post(
        'https://mentor-prep-rest-api.onrender.com/api/v1/posts',
        {
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags, // Add tag property here
        },
        {
          headers: {
            'auth-token': authtoken,
          },
        }
      )
      fetchData();
      setNewPost({ title: '', content: '', tags: [] });
  };

  const onChange = (event:any) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className='flex'>
        <div className='overflow-hidden mx-auto pt-5 break-words lg:grid lg:gap-8 lg:grid-cols-[minmax(0,_1fr)_300px]'>
          <div className='flex flex-col gap-8'>
            {posts.map((post, id) => (
              <div key={id}>
                <Card post={post} getData={fetchData}/>
              </div>
            ))}
            <div className='flex flex-col gap-4 border rounded #EAEAEA p-3 shadow-sm'>
              <TextInput
                name='title'
                label='Title'
                placeholder='Enter your title here'
                value={newPost.title}
                onChange={onChange}
              />
              <Textarea
                name='content'
                label='Participate in Discussion'
                placeholder='Enter your text here'
                value={newPost.content}
                onChange={onChange}
              />
              <MultiSelect
                name='tags'
                label='Tags'
                placeholder='Pick tags'
                data={['Development', 'Artificial Intelligence', 'Machine Learning', 'Flutter']}
                value={newPost.tags} // Use newPost.tag for value
                onChange={(selected) => setNewPost({ ...newPost, tags: selected })}
                clearable
                maxValues={3}
              />
              <Button variant='primary' onClick={handleSend} className='w-fit min-w-fit'>
                Send Message
              </Button>
            </div>
          </div>
          <div className='lg:flex lg:flex-col'>
            <div className='lg:cursor-pointer flex justify-center items-center'>
              <a href='/'>
                <Image src={image.src} alt='image' className='object-contain' width={300} height={250}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
