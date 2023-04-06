import { useState, useRef } from "react";
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const Form = ({ formData, setFormData }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const submitRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID as string,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID as string,
      formData,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY as string
    ).then((response) => {
      console.log('SUCCESS!', response);
      setFormData((currValue: any) => ({ ...currValue, status: "SUCCESS" }))
    }, (error) => {
      console.log('FAILED...', error);
    });
  }

  if (formData.toggle) return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute w-[calc(100%-32px)] h-14 
        bg-transparent bottom-0 right-0 
        items-center mx-4"
    >
      <Inputs
        formData={formData}
        setFormData={setFormData}
        register={register}
      />
      <button
        ref={submitRef}
        type="submit"
        style={{ display: 'none' }}
      />
    </form>
  ); else return null;
}

const Inputs = ({ formData, setFormData, register }: any) => {
  const [value, setValue] = useState("");

  switch (true) {
    case (!formData.name):
      return (
        <Input
          type="text"
          name="name"
          register={register}
          setFormData={setFormData}
          value={value}
          setValue={setValue}
          formProps={{ name: value }}
        />
      )
    case (!formData.email):
      return (
        <Input
          type="email"
          name="email"
          register={register}
          setFormData={setFormData}
          value={value}
          setValue={setValue}
          formProps={{ email: value }}
        />
      )
    case (!formData.message):
      return (
        <Input
          type="text"
          name="message"
          register={register}
          setFormData={setFormData}
          value={value}
          setValue={setValue}
          formProps={{ message: value }}
        />
      )
    default:
      return null;
  }
}

const Input = ({ register, name, type, setFormData, value, setValue, formProps }: any) => {

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFormData((currValue: any) => ({ ...currValue, ...formProps }))
      setValue("");
    }
  }

  return (
    <input
      {...register(name)}
      type={type}
      required
      spellCheck="false"
      autoComplete="off"
      className="bg-transparent outline-none text-white w-full p-4"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
}

export { Form }