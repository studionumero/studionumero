import { useEffect, useRef } from "react";
import { ChatTransition } from "../../hooks/useChatTransition";

const Chat = ({ messages, buttons }: any) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollToBottom();
  }, [messages, buttons]);

  return (
    <div className="flex flex-col h-80 space-y-4 overflow-y-scroll">
      <Messages messages={messages} />
      <Buttons buttons={buttons} />
      <div ref={scrollRef} />
    </div>
  )
}

const Messages = ({ messages }: any) => {
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

const Buttons = ({ buttons }: any) => (
  <div className="flex flex-row space-x-4 items-center self-center">
    {buttons.map((item: any, index: number) => {
      return (
        <button
          className="flex p-4 w-max 
          border-2 border-black rounded-3xl 
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

export { Chat }