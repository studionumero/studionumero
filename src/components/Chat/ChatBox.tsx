import { useState, useMemo } from "react";
import { Chat } from "./Chat";
import { Form } from "./Form";
import { UseChat } from "../../hooks/useChat";
import { MessageProps, ButtonProps } from "../../interfaces/ChatBox";

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [buttons, setButtons] = useState<ButtonProps[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
    toggle: false,
    loop: false,
    clear: false,
  });

  console.log(messages);

  useMemo(() =>
    UseChat({ messages, setMessages, setButtons, setFormData, formData }),
    [formData]);

  return (
    <section
      className="relative flex flex-col
      w-[600px] h-96 px-4 
      bg-slate-100 border-2 border-black"
    >
      <Chat
        messages={messages}
        buttons={buttons}
      />
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

export { ChatBox }