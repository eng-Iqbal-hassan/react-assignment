import { useEffect } from 'react';
import { Form, TextField, Label, Input } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/primitives/Button';
import { supabase } from '../../lib/supabase';

type SignUpForm = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    mode: 'onTouched',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return;
      }

      if (data.session) {
        navigate('/dashboard');
      }
    }

    void checkSession();
  }, [navigate]);

  async function signUp(formData: SignUpForm) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.userName,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.session) {
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Form
        className="mt-12 flex flex-col gap-8"
        onSubmit={handleSubmit(signUp)}
      >
        {/* USERNAME */}
        <TextField name="userName">
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Username"
            {...register('userName', {
              required: 'Username is required.',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters.',
              },
            })}
          />
          {errors.userName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.userName.message}
            </p>
          )}
        </TextField>

        {/* EMAIL */}
        <TextField name="email">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
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

        {/* PASSWORD */}
        <TextField name="password">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
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

        {/* CONFIRM PASSWORD */}
        <TextField name="confirmPassword">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match.',
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </TextField>

        <Button
          type="submit"
          variant="solid"
          size="large"
          isDisabled={isSubmitting}
          className="mt-2"
        >
          {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
        </Button>
      </Form>

      <div className="text-sm text-center mt-4">
        <span>Already have an account? </span>

        <Button
          type="button"
          variant="plain"
          onClick={() => navigate('/login')}
          className="text-green-800 bg-transparent p-0 border-0 hover:underline font-medium"
        >
          Login
        </Button>
      </div>
    </>
  );
}
