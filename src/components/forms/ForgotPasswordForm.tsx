
import Link from 'next/link';

import { Formik, FormikProps } from 'formik';
import { toast } from 'react-toastify'
import * as Yup from 'yup';

import FieldError from '../FieldError';
import TextInput from '../TextInput';

const ForgotPasswordForm = () => {
  const initialValues = {
    username: '',
  };

  const formSchema = Yup.object().shape({
    username: Yup.string().trim().max(255).email('Please provide a valid email'),
  });

  type FormProps = FormikProps<{
    username: string;
  }>

  const renderForm = ({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, values, touched }: FormProps) => (
    <div className="w-full md:w-4/5 p-10 max-w-screen-lg">
      <h3 className='mb-6 text-2xl'>Forgot Password?</h3>
      <p className='mb-4'>Enter your account&apos;s email address and we will send you instructions to reset your password.</p>
      <div className="w-full max-w-screen-lg">
        <div className="bg-white">
          <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
            <div className='mb-6 bg-white'>
              <TextInput
                name='username'
                ariaLabel='username'
                placeHolder='Enter Email'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FieldError error={errors.username} touched={touched.username} />
            </div>

            <div className='mb-3'>
              <button
                type='submit'
                disabled={values.username.length === 0 || isSubmitting}
                className={`text-white px-4 py-6 rounded w-full ${values.username.length === 0 ? 'bg-gray-500 disabled:opacity-25 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                Reset Password
              </button>
            </div>
            <div className='flex justify-end'>
              <Link href='/login'>
                <a className="underline text-sm text-blue-500 hover:text-blue-800">
                  Go back
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-full md:w-3/5 flex justify-center items-center p-4 relative'>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false);
          try {
            const response = await fetch('/api/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            if (response.ok && response.status === 200) {
              toast.success('Password reset sent!');
            } else {
              // If the User is not found
              toast.error('Something went wrong. Please try again.');
            }
          } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
          } finally {
            actions.setSubmitting(false);
          }
        }}>
        {renderForm}
      </Formik>
    </div>
  )
}

export default ForgotPasswordForm
