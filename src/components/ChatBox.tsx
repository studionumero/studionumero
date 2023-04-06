import { useEffect, useRef, useState, useMemo } from "react";
import { Form } from "./ChatForm";
import { getMessages } from "../hooks/getMessages";
import { ChatTransition } from "../hooks/useChatTransition";
import { MessageProps, ButtonProps } from "../interfaces/ChatBox";

const ChatBox = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [buttons, setButtons] = useState<ButtonProps[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
    toggle: false,
    loop: false,
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
      <div className="absolute bottom-0 right-0 
        bg-black w-[calc(100%-32px)] h-14 z-0 
        rounded-3xl mx-4"
      />
      <Form
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  )
}

const MessagesMap = ({ messages }: any) => {
  const bubbleRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    ChatTransition({ bubbleRef, messageRef });
  }, [messages])

  const Bubble = ({ children, myRef, classname }: any) => (
    <div
      ref={myRef}
      className={`flex whitespace-pre
        bg-black text-white
        w-max p-4 rounded-3xl
        ${classname}
      `}
    >
      {children}
    </div>
  )

  return messages.map((item: any, index: number) => {
    if (item.classname === "self-end") {
      return (
        <div key={index} className={item.classname}>
          <Bubble>
            <p>{item.text}</p>
          </Bubble>
        </div>
      )
    } else return (
      <div key={index}>
        <Bubble myRef={bubbleRef} classname="h-14 typing-indicator">
          <span /><span /><span />
        </Bubble>
        <Bubble myRef={messageRef} classname={item.classname}>
          <p>{item.text}</p>
        </Bubble>
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

export { ChatBox }