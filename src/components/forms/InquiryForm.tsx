
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import Image from 'next/image';

import FieldError from '../FieldError';
import TextInput from '../TextInput';
import { CardProps } from '../Card';

const InquiryForm = ({
  address,
  zipCode,
  bedrooms,
  yearBuilt,
  bathrooms,
  sqft,
  imageSrc,
  setClose
}: CardProps) => {
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    message: '',
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formSchema = Yup.object().shape({
    name: Yup.string().trim().max(255).email('Please provide a valid email').required('This field is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This field is required'),
    email: Yup.string().trim().email('Please provide a valid email').max(255).required('This field is required'),
    message: Yup.string().trim().max(255),
  });

  type FormProps = FormikProps<{
    name: string;
    phone: string;
    email: string;
    message: string;
  }>

  const renderForm = ({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, values, touched }: FormProps) => (
    <div className="m-4">
      <h1 className="text-2xl font-bold text-custom-900 mb-2">Property Listing Inquiry</h1>
      <p className="text-gray-700 mb-4">Please fill the form below to know more about the property - {address}</p>
      <div className='flex justify-center'>
        {imageSrc &&
          <Image
            alt='Mountains'
            src={imageSrc}
            height={200}
            width={300}
            className='rounded-xl'
          />
        }
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-4 my-6 mx-6 text-gray-600">
        <div>Zip Code: {zipCode}</div>
        <div>Bedrooms: {bedrooms}</div>
        <div className="row-start-2">Bathrooms: {bathrooms}</div>
        <div className="row-start-2">Year Built: {yearBuilt}</div>
        <div className="row-start-3">Square Ft.: {sqft}</div>
      </div>
      <div>
        <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
          <div className='mb-4'>
            <TextInput
              name='name'
              ariaLabel='name'
              placeHolder='Name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.name} touched={touched.name} />
          </div>
          <div className='mb-4'>
            <TextInput
              name='phone'
              ariaLabel='phone'
              placeHolder='Phone Number'
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.phone} touched={touched.phone} />
          </div>
          <div className='mb-4'>
            <TextInput
              name='email'
              ariaLabel='email'
              placeHolder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.email} touched={touched.email} />
          </div>

          <div className='mb-4'>
            <TextInput
              name='message'
              ariaLabel='message'
              placeHolder='Message'
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.message} touched={touched.message} />
          </div>

          <div className='mb-3'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`text-white px-4 py-4 rounded w-full bg-blue-500 hover:bg-blue-600`}>
              Send Message
            </button>
          </div>
          <div className='mb-3'>
            <button
              type='button'
              onClick={setClose}
              className={`px-4 py-4 rounded w-full text-blue-600`}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className='px-4'>
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

export default InquiryForm
