'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/lib/stores/auth.store';
import type { LoginFormValues } from '@/lib/login.schema';
// eslint-disable-next-line no-duplicate-imports
import { loginSchema } from '@/lib/login.schema';

export function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const disabledStatus = isSubmitting || isLoading || isAuthenticated;

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();

        switch (errorData.error) {
          case 'INVALID_CREDENTIALS':
            setError('Wrong username or password');
            break;
          default:
            setError('Something went wrong. Try again.');
        }

        return;
      }

      const meRes = await fetch('/api/auth/me');

      if (!meRes.ok) {
        setError('Failed to fetch user data');
      }

      const data = await meRes.json();
      login(data.user);

      router.push('/');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Loading failed';
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full p-5">
      {isAuthenticated && (
        <p className="text-center">
          If you want to log in to another account, please first log out of the current one.
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">
          Username: <i>emilys</i>
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          disabled={disabledStatus}
          className="w-full border px-3 py-3 rounded"
          {...register('username')}
        />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Password: <i>emilyspass</i>
          </Label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <span className="flex items-center gap-1">
                <EyeOff className="h-4 w-4" />
                Hide
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                Show
              </span>
            )}
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            disabled={disabledStatus}
            className="w-full border px-3 py-3 rounded"
            {...register('password')}
          />
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        disabled={disabledStatus}
        className="w-full text-white py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Log in'}
      </Button>
    </form>
  );
}
