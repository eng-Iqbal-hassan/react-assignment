import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, TextField, Label, Input } from 'react-aria-components';
import { Button } from '../../components/primitives/Button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

type LoginForm = {
  email: string;
  password: string;
};

export function LogIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  async function signIn(formData: LoginForm) {
    if (loading) return;

    setAuthError('');

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setAuthError('Incorrect email or password.');
        return;
      }

      if (data.session) {
        navigate('/dashboard');
      }
    } catch {
      setAuthError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return null;
  }

  return (
    <>
      <Form
        className="flex flex-col gap-6 mt-12"
        onSubmit={handleSubmit(signIn)}
      >
        {/* Server Error */}
        {authError && (
          <p className="text-sm text-red-600 font-medium">{authError}</p>
        )}

        {/* Email */}
        <TextField name="email">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </TextField>

        {/* Password */}
        <TextField name="password">
          <Label>Password</Label>

          <Input
            type="password"
            placeholder="Password"
            aria-invalid={!!errors.password}
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters.',
              },
            })}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </TextField>

        <Button
          type="submit"
          variant="solid"
          size="large"
          isDisabled={loading}
          className="mt-2"
        >
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </Button>
      </Form>

      <div className="text-sm text-center mt-4">
        <span>Don't have an account? </span>

        <Button
          type="button"
          variant="plain"
          onClick={() => navigate('/')}
          className="font-sm text-green-800 p-0 border-0 hover:underline focus:underline font-medium"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
