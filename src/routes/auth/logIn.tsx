import { useState, useEffect } from 'react';
import { Form, TextField, Label, Input } from 'react-aria-components';
import { Button } from '../../components/primitives/Button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // ✅ FIX: block login page if session already exists
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate('/dashboard');
        return;
      }

      setCheckingSession(false);
    };

    void checkSession();
  }, [navigate]);

  async function signIn() {
    if (loading) return;

    try {
      if (!email.trim() || !password.trim()) {
        alert('Email and password are required');
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.session) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  // ✅ Prevent UI flicker while checking session
  if (checkingSession) {
    return null; // or loader if you want
  }

  return (
    <>
      <Form
        className="flex flex-col gap-8 mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          void signIn();
        }}
      >
        <TextField name="email" isRequired>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </TextField>

        <TextField name="password" isRequired>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </TextField>

        <Button type="submit" variant="solid" size="large" isDisabled={loading}>
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </Button>
      </Form>

      <div className="text-sm text-center mt-4">
        <span>Don't have an account? </span>

        <Button
          type="button"
          onClick={() => navigate('/')}
          className="text-green-800 bg-transparent p-0 border-0 hover:underline font-medium"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
