import { useEffect, useRef, useState, useMemo, Fragment } from "react";
import { getMessages } from "../hooks/getMessages";
import { ChatTransition } from "../hooks/useChatTransition";
import { Message, Button } from "../interfaces/ChatBox";
import emailjs from '@emailjs/browser';

const ChatBox = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [buttons, setButtons] = useState<Button[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
    toggle: false,
    loop: false,
    loopProp: "",
  });

  console.log(messages);

  useMemo(() =>
    getMessages({ messages, setMessages, setButtons, setFormData, formData }),
    [formData]);

  useEffect(() => {
    const scrollToBottom = () => scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollToBottom();
  }, [messages, formData]);

  return (
    <section
      className="relative flex flex-col
      w-[600px] h-96 px-4 
      bg-slate-100 border-2 border-black"
    >
      <div className="flex flex-col h-80 space-y-4 overflow-y-scroll">
        <MessagesMap messages={messages} />
        <ButtonsMap buttons={buttons} />
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

const MessagesMap = ({ messages }: any) => {
  const bubbleRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    ChatTransition({ bubbleRef, messageRef });
  })

  const Bubble = () => (
    <div
      ref={bubbleRef}
      className="typing-indicator whitespace-pre rounded-3xl flex w-max 
      p-4 bg-black text-white transition-all"
    >
      <span />
      <span />
      <span />
    </div>
  );

  return messages.map((item: any, index: number) => {
    if (item.classname === "self-end") {
      return (
        <div
          key={index}
          className={`rounded-3xl flex w-max 
          transition-opacity ease-in duration-300
           p-4 bg-black text-white ${item.classname}`}
        >
          <p>{item.text}</p>
        </div>
      )
    } else return (
      <div key={index} className="flex mt-4 h-14 overflow-visible">
        {/* <div className="relative"> */}
        <Bubble />
        <div
          ref={messageRef}
          className={`whitespace-pre rounded-3xl 
          w-max 
          hidden transition
          p-4 bg-black text-white ${item.classname}`}
        >
          <p>{item.text}</p>
        </div>
        {/* </div> */}
      </div>
    )
  })
};

const ButtonsMap = ({ buttons }: any) => (
  <div className="flex flex-row space-x-4 items-center self-center">
    {buttons.map((item: any, index: number) => {
      return (
        <button
          className="flex 
          border-2 border-black rounded-3xl 
          p-4 w-max 
          transition-opacity ease-in-out duration-200"
          onClick={item.onClick}
          key={index}
        >
          {item.text}
        </button>
      )
    })}
  </div>
);

const ChatBar = () => (
  <div className="absolute bottom-0 right-0 
    bg-black w-[calc(100%-32px)] h-14 z-0 
    rounded-3xl mx-4"
  />
);

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
      className="absolute w-[calc(100%-32px)] h-14 
        bg-transparent bottom-0 right-0 
        items-center mx-4"
      onSubmit={sendEmail}
    >
      {inputSwitch({ input, setInput, formData, setFormData })}
      <button
        ref={submitRef}
        type="submit"
        style={{ display: 'none' }}
      />
    </form>
  ); else return <Fragment />;
}

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

export { ChatBox }