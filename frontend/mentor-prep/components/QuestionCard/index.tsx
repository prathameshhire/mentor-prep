"use client"
import { ActionIcon, Avatar, Checkbox, rem } from '@mantine/core'
import { IconArrowBigDown, IconArrowBigUp, IconTrash } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Question {
    _id: string;
    question: string;
    desc: string;
    askedBy: string | null;
    isAnswered: boolean;
    answeredBy: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export const formatUpdatedAt = (updatedAt: string | undefined) => {
    if (!updatedAt) {
      return "";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(updatedAt).toLocaleString("en-US", options);
    const [date, year, time] = formattedDate.split(",");
    return `${date} | ${time.trim()}`;
  };

const Card = ({ question, getData }: { question: Question, getData:() => Promise<void> }) => {
    const authtoken = localStorage.getItem("authtoken")
    const [checked, setChecked] = useState(false);
      const handleSolved = async () => {
        try {
          const response = await axios.put(
            `https://mentor-prep-rest-api.onrender.com/api/v1/questions/${question._id}/done`,
            {isAnswered: true},
            {
              headers: {
                'auth-token': authtoken,
              },
            }
          );
    
          // Assuming you want to handle the response or update the UI after marking the question as solved
          console.log('Question marked as solved:', response.data); // Assuming you have a state variable to track data updates
        } catch (error) {
          console.error('Error marking question as solved:', error);
        }
      };
  
    return (
      <div className='border-2 border-[#EAEAEA] h-fit flex flex-col gap-3 p-4 w-[800px] rounded-md shadow-md'>
        <div className='flex justify-between'>
        <div className='SECTION-1 flex gap-3 items-center'>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="lg"
          />
          <h2>{question.askedBy}</h2>
          </div>
          <div className='flex gap-1'>
          <span className='italic'>Posted on-</span> 
          <span className='italic'>{formatUpdatedAt(question?.createdAt)}</span>
          </div>
        </div>
          
          <div className='SECTION-2'>
              <h3 className='font-semibold'>{question.question}</h3>
              <p>{question.desc}</p>
          </div>
          <div className='SECTION-3 text-right self-end'>
            <div className='flex gap-2'>
            <ActionIcon size="lg" color="red" variant="subtle" onClick={()=>{handleSolved()}}>
                <IconTrash style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
              </ActionIcon>
            </div>
            </div>
      </div>
    )
  }
  
  export default Card

  /*
  <ActionIcon size="lg" color="red" variant="subtle" onClick={()=>{hand()}}>
                  <IconTrash style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
                </ActionIcon>

                <Checkbox checked={question.isAnswered} onChange={() => handleSolved()} color="green"/>
  */