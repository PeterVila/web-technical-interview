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

export default FieldError