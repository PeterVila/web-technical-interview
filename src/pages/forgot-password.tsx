import type { NextPage } from "next"
import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';

import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

const ForgotPasswordPage: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex">
      <Head>
        <title>Forgot Password?</title>
        <meta name='forgot-password' content='Forgot Password Page' />
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
      <ForgotPasswordForm />
      <div
        className="w-100 md:w-2/5 bg-[url('/house1.jpg')] bg-cover"
        title='House'
      />
    </div>
  )
}

export default ForgotPasswordPage
