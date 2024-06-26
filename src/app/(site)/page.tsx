import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt="Logo Reu Messenger" src="/logo.svg" className="mx-auto w-auto" width={48} height={48} />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      {/* AuthForm*/}
      <AuthForm />
      <p className="pt-3 text-center font-light text-neutral-500">
        This Project was made for personal learning.
        <br /> Not real project ^^.
      </p>
    </div>
  );
}
