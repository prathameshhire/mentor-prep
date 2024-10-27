"use client"

import { Button, Card, Drawer, Title } from '@mantine/core';
import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaStar } from 'react-icons/fa';
import { GiGraduateCap } from "react-icons/gi";


const MentorPage: React.FC = () => {
  const mentor = {
    name: 'John Doe',
    picture: 'https://picsum.photos/id/237/200/300',
    expertises: ['React', 'JavaScript', 'Web Development'],
    rating: 4,
    description:
      'John Doe is a highly skilled mentor with expertise in React, JavaScript, and web development. He has helped numerous individuals in their coding journey and is passionate about sharing knowledge. John Doe is a highly skilled mentor with expertise in React, JavaScript, and web development. He has helped numerous individuals in their coding journey and is passionate about sharing knowledge.John Doe is a highly skilled mentor with expertise in React, JavaScript, and web development. He has helped numerous individuals in their coding journey and is passionate about sharing knowledge.John Doe is a highly skilled mentor with expertise in React, JavaScript, and web development. He has helped numerous individuals in their coding journey and is passionate about sharing knowledge.',
    reviews: [
      { id: 1, rating: 5, comment: 'Great mentor! Very helpful. ', name: 'Alice', picture: 'https://picsum.photos/id/238/200/300' },
      { id: 2, rating: 4, comment: 'Solid guidance, would recommend. Solid guidance, would recommend.Solid guidance, would recommend.Solid guidance, would recommend.', name: 'Bob', picture: 'https://picsum.photos/id/239/200/300' },
      // Add more reviews as needed
    ],
    socialMediaLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
    pricingModel: "subscription", 
    rate: 50, 
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handlePayment = () => {
    // Handle payment logic here (you can integrate with payment gateway, etc.)
    // After successful payment, you can close the drawer
    closeDrawer();
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen container mx-auto">
      <img
        src={mentor.picture}
        alt={mentor.name}
        className="rounded-full w-32 h-32 mb-4"
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold">{mentor.name}</h1>
        <div className='flex justify-center'>

      {[...Array(mentor.rating)].map((_, index) => (
                <FaStar key={index} className="h-5 w-5 text-yellow-500" />
              ))}
        </div>
        <div className="flex mt-2 justify-center">
          {mentor.expertises.map((expertise, index) => (
            <div key={index} className="mr-2 flex items-center">
                <GiGraduateCap className="h-5 w-5 mr-1" />
              {expertise}
            </div>
          ))}
        </div>
        <div className="mt-2">
        <Button onClick={openDrawer} className="mb-4">
            {mentor.pricingModel === 'subscription' ? 'Subscribe' : 'Book a Slot'}
          </Button>
      </div>
      </div>
      <Drawer
        size="sm"
        opened={isDrawerOpen}
        onClose={closeDrawer}
        withOverlay
        padding="md"
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Pricing</h2>
          <p>Rate: ${mentor.rate} per hour</p>
          <div className="mt-4">
            <Button onClick={handlePayment} className="mr-4">
              Pay
            </Button>
            <Button onClick={closeDrawer} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </Drawer>
      <p className="mt-4 text-center">{mentor.description}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-center">Reviews</h2>
        <div className="flex mt-2 flex-wrap">
        {mentor.reviews.map((review) => (
            <Card
              key={review.id}
              shadow="sm"
              className="mr-4 p-4 mt-2"
              style={{ flex: '1 1 calc(33.33% - 10px)', maxWidth: '300px' }}
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.picture}
                  alt={review.name}
                  className="rounded-full w-8 h-8 mr-2"
                />
                <Title order={4}>{review.name}</Title>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
              <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {review.comment}
              </div>
            </Card>
          ))}
          </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Connect with {mentor.name}</h2>
        <div className="flex mt-2 justify-center">
          <a href={mentor.socialMediaLinks.twitter} className="mr-4">
            <FaTwitter className="text-blue-500" />
          </a>
          <a href={mentor.socialMediaLinks.linkedin} className="mr-4">
            <FaLinkedin className="text-blue-800" />
          </a>
          <a href={mentor.socialMediaLinks.github} className="mr-4">
            <FaGithub className="text-gray-800" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
