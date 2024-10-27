"use client";
import React, { useEffect, useState } from 'react';
import { TextInput, Textarea, Group, Title, Button, rem } from '@mantine/core';
import axios from 'axios';
import QuestionCard from '../QuestionCard';
import { IconSend } from '@tabler/icons-react';

interface FormValues {
  question: string;
  desc: string;
}

export function GetInTouchSimple() {
  const authtoken = localStorage.getItem('authtoken');
  const [questions, setQuestions] = useState([]);
  const [formValues, setFormValues] = useState<FormValues>({
    question: '',
    desc: '',
  });
  const userId = localStorage.getItem("userId")

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mentor-prep-rest-api.onrender.com/api/v1/questions/me`, {
        headers: {
          'auth-token': authtoken,
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data.data.questions);
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error('Error fetching Card data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = (name: string, value: string) => {
    // Simple validation, you can customize this based on your requirements
    if (value.trim().length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: 'This field is required' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Custom validation logic
    const newErrors: Record<string, string> = {};
    if (formValues.question.trim().length === 0) {
      newErrors.question = 'This field is required';
    }
    if (formValues.desc.trim().length === 0) {
      newErrors.description = 'This field is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission logic here
    try {
      await axios.post(
        'https://mentor-prep-rest-api.onrender.com/api/v1/questions',
        {
          question: formValues.question,
          desc: formValues.desc,
          // Assuming you want to send these values to the server
        },
        {
          headers: {
            'auth-token': authtoken,
          },
        }
      );
      console.log(formValues)
      // Reset form values after successful submission
      setFormValues({ question: '', desc: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center">
      <form onSubmit={handleSubmit} className='w-[800px]'>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Get in touch
        </Title>
        <TextInput
          label="Title"
          placeholder="Title"
          mt="md"
          name="question"
          variant="filled"
          value={formValues.question}
          onChange={(event) => handleChange('question', event.currentTarget.value)}
          onBlur={(event) => handleBlur('question', event.currentTarget.value)}
          error={errors.question}
        />
        <Textarea
          mt="md"
          label="Description"
          placeholder="Enter your Description here"
          maxRows={10}
          minRows={5}
          autosize
          name="desc"
          variant="filled"
          value={formValues.desc}
          onChange={(event) => handleChange('desc', event.currentTarget.value)}
          onBlur={(event) => handleBlur('desc', event.currentTarget.value)}
          error={errors.description}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            <IconSend style={{ width: rem(20), height: rem(20), marginRight:"12px" }} stroke={1.5} />
            Send Question
          </Button>
        </Group>
      </form>
      {questions.map((question, id) => (
        <div key={id}>
          <QuestionCard question={question} getData={fetchData}/>
        </div>
      ))}
    </div>
  );
}
