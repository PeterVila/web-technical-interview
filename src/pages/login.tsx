import React, { useEffect } from 'react';
import type { NextPage } from "next"
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import LoginForm from '../components/forms/LoginForm';

const LoginPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticated = localStorage.getItem('authorized');

    if (authenticated) {
      const parsedAuthorization = JSON.parse(authenticated);
      router.push(`/users/${parsedAuthorization.id}`);
    }
  }, [router]);

  return (
    <div className="w-full min-h-screen flex">
      <Head>
        <title>Login</title>
        <meta name='login' content='Login page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Link href='/'>
        <a className='absolute top-0 left-0 mt-4 ml-4 cursor-pointer'>
          <Image
            alt='Revive Logo'
            src='/revive.png'
            width={200}
            height={50}
          />
        </a>
      </Link>
      <LoginForm />
      <div
        className="w-100 md:w-2/5 bg-[url('/house1.jpg')] bg-cover"
        title='House'
      />
    </div>
  )
}

export default LoginPage
