import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion"

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

const Bubble = ({ children, classname, animate, initial, transition, exit }: any) => (
  <motion.div
    animate={animate}
    initial={initial}
    transition={transition}
    exit={exit}
    className={`flex 
      bg-black text-white
      max-w-[75%] w-fit 
      whitespace-pre-wrap p-4 rounded-3xl
      ${classname}
    `}
  >
    {children}
  </motion.div>
)

const BubbleWrapper = (props: any) => {
  const { item } = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      // Do not call state changes on unmounted components
      if (!isMounted) return;
      setIsVisible(false);
    }, 1100);

    return () => {
      isMounted = false;
    }
  }, []);

  if (isVisible) return (
    <AnimatePresence>
      <Bubble
        classname="h-14 typing-indicator"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "linear", duration: 0.15 }}
      >
        <span /><span /><span />
      </Bubble >
    </AnimatePresence >
  ); else return (
    <Bubble
      classname={item.classname}
      initial={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.1 }}
    >
      <p>{item.text}</p>
    </Bubble>
  )
}

const Messages = ({ messages }: any) => {
  return messages.map((item: any, index: number) => {
    if (item.from === "user") return (
      <div key={index} className="grid justify-items-end w-full">
        <Bubble>
          {item.text}
        </Bubble>
      </div>
    ); else if (item.from === "zero") return (
      <div key={index} className="bubble-container mt-4">
        <BubbleWrapper item={item} />
      </div>
    ); else return null;
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