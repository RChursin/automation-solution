"use client";

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure any client-side-only logic runs here
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background items-center justify-center px-4">
      <header className="mb-8">
        <h2 className="text-4xl font-bold text-foreground">Login Page</h2>
      </header>

      <Card className="w-full max-w-md rounded-lg border bg-background/60 shadow-lg p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-lg border rounded"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-lg border rounded"
            />
          </div>
          <Button variant="outline" className="w-full text-lg py-2" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>

      <footer className="mt-8 text-sm text-muted-foreground">
        <p>© 2024 Automation Solutions</p>
      </footer>
    </div>
  );
}