import { useEffect, useRef, useState, useMemo } from "react";
import { getMessages } from "../hooks/getMessages";
import emailjs from '@emailjs/browser';

interface Message {
  type: string;
  text: string;
  classname?: string;
  onClick?: React.MouseEventHandler;
}

const ChatBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
    toggle: false
  });

  const [messages, setMessages] = useState<Message[]>([])

  useMemo(() => getMessages({ messages, setMessages, setFormData, formData }), [formData]);

  console.log(messages);

  // const [showContactChoice, setShowContactChoice] = useState(true);

  // const [showMessage, setShowMessage] = useState(false);
  // const [showMessageChoice, setShowMessageChoice] = useState(true);

  // const [success, setSuccess] = useState(false);
  // const [showSuccessChoice, setShowSuccessChoice] = useState(true);


  const scrollRef = useRef<null | HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => scrollRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom()
  }, [messages, formData]);

  return (
    <section className="relative border-2 border-black px-4 flex flex-col bg-slate-100 w-[600px] h-96">
      <div className="flex flex-col h-80 space-y-4 overflow-y-scroll">
        {messagesMap({ messages })}
        <div ref={scrollRef} />
      </div>
      <ChatBar />
      <Form
        formData={formData}
        setFormData={setFormData}
        submitRef={submitRef}
      />
    </section>
  )
}

const messagesMap = ({ messages }: any) => {
  return messages.map((item: any, index: number) => {

    if (item.type === "bubble") {
      return <Bubble
        classname={item.classname}
        key={index}
        text={item.text}
      />
    } else if (item.type === "button") {
      return <Button
        onClick={item.onClick}
        key={index}
        text={item.text}
      />
    }

  })
}

const ChatBar = () => (
  <div className="absolute bottom-0 right-0 bg-black w-[calc(100%-32px)] h-14 z-0 rounded-3xl mx-4" />
)

const Form = ({ formData, setFormData, submitRef }: any) => {
  const [input, setInput] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID as string,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID as string,
      formData,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY as string
    )
      .then(function (response) {
        console.log('SUCCESS!', response);
        setFormData((currValue: any) => ({ ...currValue, status: "SUCCESS" }))
      }, function (error) {
        console.log('FAILED...', error);
      });
  };

  if (formData.toggle) return (
    <form
      className="absolute w-[calc(100%-32px)] bg-transparent bottom-0 right-0 h-14 items-center mx-4"
      onSubmit={sendEmail}
    >
      {inputSwitch({ input, setInput, formData, setFormData })}
      <button ref={submitRef} type="submit" style={{ display: 'none' }} />
    </form>
  ); else return <></>;
}

const Bubble = ({ text, classname }: any) => (
  <div className={`whitespace-pre rounded-3xl flex w-max p-4 bg-black text-white ${classname}`}>
    {text}
  </div>
);

const Button = ({ text, onClick }: any) => (
  <button
    onClick={onClick}
    className="flex border-2 border-black rounded-3xl p-4 w-max"
  >
    {text}
  </button>
);

const ButtonWrapper = ({ children }: any) => (
  <div className="flex flex-row space-x-4 items-center self-center">
    {children}
  </div>
);

const inputSwitch = ({ input, setInput, formData, setFormData }: any) => {
  switch (true) {
    case (formData.toggle && formData.name === ""):
      return <Input
        type="text"
        placeholder="name"
        setFormData={setFormData}
        input={input}
        setInput={setInput}
        propertyAssign={{ name: input }}
      />
    case (formData.toggle && formData.email === ""):
      return <Input
        type="email"
        placeholder="Email address"
        setFormData={setFormData}
        input={input}
        setInput={setInput}
        propertyAssign={{ email: input }}
      />
    case (formData.toggle && formData.message === ""):
      return <Input
        type="text"
        placeholder="Message"
        setFormData={setFormData}
        input={input}
        setInput={setInput}
        propertyAssign={{ message: input }}
      />
    default:
      return null;
  }
}

const Input = ({ placeholder, propertyAssign, type, input, setFormData, setInput }: any) => (
  <input
    type={type}
    spellCheck="false"
    placeholder={placeholder}
    className="bg-transparent outline-none text-white w-full p-4"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setFormData((currValue: any) => ({
          ...currValue,
          // property name : state
          ...propertyAssign
        }))
        setInput("");
      }
    }}
  />
);

// prompt user
// user enters response
// validate response
// if unvalid, notify user, else, accept response

// repeat X times

// on final validation, send responses to email
// ask user "Do you want to chat again?"

// if user selects 'emoji' send corresponding message

export { ChatBox }

{/*         
        <Bubble text="Hi!" />
        <Bubble text="How can I help you?" />

        {showContactChoice &&
          <ButtonWrapper>
            <Button onClick={() => { setContact(true); setShowContactChoice(false) }} text="Contact" />
            <Button text="???" />
          </ButtonWrapper>
        }

        {contact && <>
          <Bubble text="Contact" classname="self-end" />
          <Bubble text="What's your full name?" />
        </>}

        {data.name && <>
          <Bubble text={data.name} classname="self-end" />
          <Bubble text="Woah, that's a cool name!" />
          <Bubble text="What's your email?" />
        </>}

        {data.email && <>
          <Bubble text={data.email} classname="self-end" />
          <Bubble text="Do you want to leave a message?" />
        </>}

        {data.email && showMessageChoice &&
          <ButtonWrapper>
            <Button onClick={() => { setShowMessage(true); setShowMessageChoice(false) }} text="Yes" />
            <Button text="No" />
          </ButtonWrapper>
        }

        {showMessage && <>
          <Bubble text="Yes" classname="self-end" />
          <Bubble text="Awesome! What's your message?" />
        </>}

        {data.message && <Bubble text={data.message} classname="self-end" />}

        {data.name && data.email && data.message && <>
          <Bubble text="Okay, let's see if I have this right.." />
          <Bubble text={`Name: ${data.name} \nEmail: ${data.email} \nMessage: ${data.message}`} />
          <Bubble text="Is that correct?" />

        </>}

        {data.name && data.email && data.message && showSuccessChoice &&
          <ButtonWrapper>
            <Button onClick={() => { setSuccess(true); setShowSuccessChoice(false); submitRef?.current?.click() }} text="Yes" />
            <Button text="No" />
          </ButtonWrapper>
        }

        {success && <Bubble text="Yes" classname="self-end" />}

        {success && status === "SUCCESS" && <Bubble text="The form has been submitted successfully!" />}
        {success && status === "" && <Bubble text="There seems to have been an error" />} */}