import { useState, useEffect } from 'react';
import { Form, TextField, Label, Input } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/primitives/Button';
import { supabase } from '../../lib/supabase';

export function SignUp() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      console.log('SESSION ON LOAD:', data.session);

      if (data.session) {
        navigate('/dashboard');
      }
    }

    void checkSession();
  }, [navigate]);

  async function signUp() {
    if (loading) return;

    try {
      if (!userName.trim()) {
        alert('Username is required');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userName,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      console.log('SIGNUP RESPONSE:', data);
      console.log('SESSION AFTER SIGNUP:', data.session);

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

  return (
    <>
      <Form
        className="mt-12 flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField name="username" isRequired>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </TextField>

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

        <TextField name="confirmPassword" isRequired>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </TextField>

        <Button
          type="button"
          variant="solid"
          size="large"
          onClick={signUp}
          isDisabled={loading}
        >
          {loading ? 'SIGNING UP...' : 'SIGN UP'}
        </Button>
      </Form>

      <div className="text-sm text-center mt-4">
        <span>Already have an account? </span>

        <Button
          type="button"
          onClick={() => navigate('/login')}
          className="text-green-800 bg-transparent p-0 border-0 hover:underline font-medium"
        >
          Login
        </Button>
      </div>
    </>
  );
}
