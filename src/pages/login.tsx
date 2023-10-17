import type { NextPage } from "next"

import Image from 'next/image';
import Link from 'next/link';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import users from '../../data/users.json'

type FieldErrorTypes = {
  error: string | undefined,
  touched: boolean | undefined,
  disabled?: boolean,
}

const FieldError = ({ error, touched, disabled = false }: FieldErrorTypes) => {
  const isTouched = Array.isArray(touched) ? true : touched;
  return (
    <div>
      {disabled
        ? <small className='text-red-500 invisible' aria-live='off'>something</small>
        : error && isTouched
          ? <small className='text-red-500' aria-live='assertive'>{error}</small>
          : <small className='text-red-500 invisible' aria-live='off'>something</small>}
    </div>
  );
};

const LoginPage: NextPage = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const formSchema = Yup.object().shape({
    username: Yup.string().trim().max(255).email('Please provide a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  type FormProps = FormikProps<{
    username: string;
    password: string;
  }>

  const renderForm = ({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, values, touched }: FormProps) => (
    <div className="w-full md:w-4/5 p-10 max-w-screen-lg">
      <h3 className='mb-6 text-2xl'>Sign In</h3>
      <div className="w-full max-w-screen-lg">
        {/* FORM */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
            <div className='mb-6 bg-white'>
              <input
                className='shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                aria-label='username'
                name='username'
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <FieldError error={errors.username} touched={touched.username} />
            </div>

            <div className='mb-6 bg-white'>
              <input
                className='shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                aria-label='password'
                name='password'
                placeholder="Enter password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <FieldError error={errors.password} touched={touched.password} />
            </div>

            <div className='mb-3'>
              <button
                type='submit'
                disabled={(values.username.length === 0 || values.password.length === 0) || isSubmitting}
                className={`text-white px-4 py-6 rounded w-full ${(values.username.length === 0 || values.password.length === 0) ? 'bg-gray-500 disabled:opacity-25 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                Login
              </button>
            </div>
            <div className='flex justify-end'>
              <a className="text-blue-500 hover:text-blue-800 underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (

    <div className="w-full h-screen flex">
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
      <div className='w-full md:w-3/5 flex justify-center items-center p-4 relative'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            try {
              const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(values),
              });
              if (response.ok) {
                if (response.status === 200) {
                  const data = await response.json();
                  console.debug('file: login.tsx:128 ༻༺ onSubmit={ ༻༺ data:', data);
                  localStorage.setItem('authorized', JSON.stringify(data.authorized));
                }
              } else {
                // Trigger by changing api endpoint (filename)
                console.log('ERROR')
              }
            } catch (error) {
              console.error(error);
            } finally {
              actions.setSubmitting(false);
            }
          }}>
          {renderForm}
        </Formik>
      </div>
      <div
        className="w-100 md:w-2/5 bg-[url('/house.jpg')] bg-cover"
        title='House'
      />
    </div>
  )
}

export default LoginPage
