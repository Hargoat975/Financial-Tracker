import React, { useState } from 'react';
import { Box, Container, Heading, VStack, Input, Button, Link, Text, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setError('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Login failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <Box bg="#6EF6C6" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container bg="white" p={6} rounded="md" boxShadow="md" maxW="md">
        <Heading as="h1" size="xl" textAlign="center" mb={6} color="#1E90FF">
          Financial Tracker
        </Heading>
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="#1E90FF">
          Login
        </Heading>
        {message && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {message}
          </Alert>
        )}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" colorScheme="blue" w="full">
            Login
          </Button>
        </VStack>
        <Text textAlign="center" mt={4}>
          <Link color="blue.500" href="/register">
            Don't have an account? Sign Up
          </Link>
        </Text>
      </Container>
    </Box>
  );
}

export default Login;
