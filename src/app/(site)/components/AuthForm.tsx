'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/_components/input/input';
import Button from '@/app/_components/button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) console.log(session);
    if (session?.status === 'authenticated') {
      console.log(session);
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(variant, data);
    if (variant === 'REGISTER') {
      // Register
      axios
        .post('/api/register', data)
        .then(() => {
          signIn('credentials', data);
        })
        .catch((error) => {
          toast.error('something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === 'LOGIN') {
      // LOGIN
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Logged in!');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    console.log(action);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === 'REGISTER' && (
            <Input label="Name" id="name" type="text" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input
            label="Email address"
            id="email"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth disabled={isLoading} type="submit">
              {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>{variant === 'LOGIN' ? 'New to Reu Messenger?' : 'Already have an account?'}</div>
          <div className="cursor-pointer underline" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
