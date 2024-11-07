"use client";

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', { username, password });
      if (response.status === 201) {
        // Redirect or show success message
        console.log('Signup successful:', response.data);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="mb-8">
        <h2 className="text-4xl font-bold text-foreground">Signup Page</h2>
      </header>

      <Card className="w-full max-w-md rounded-lg border bg-background/60 shadow-lg p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Create an Account</CardTitle>
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-lg border rounded"
            />
          </div>
          <Button variant="outline" className="w-full text-lg py-2" onClick={handleSignup}>
            Signup
          </Button>
        </CardContent>
      </Card>

      <footer className="mt-8 text-sm text-muted-foreground">
        <p>© 2024 Automation Solutions</p>
      </footer>
    </div>
  );
}