import { useEffect, useRef, useState } from "react";
// import { ChatTransition } from "../../hooks/useChatTransition";

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

const Messages = ({ messages }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 1100);

  const Bubble = ({ children, classname, animate, initial, transition, exit }: any) => (
    <motion.div
      animate={animate}
      initial={initial}
      transition={transition}
      exit={exit}
      className={`flex whitespace-pre
        bg-black text-white
        w-max p-4 rounded-3xl
        ${classname}
      `}
    >
      {children}
    </motion.div>
  )

  return messages.map((item: any, index: number) => {


    switch (true) {
      case (item.classname === "self-end"):
        return (
          <div key={index} className={item.classname}>
            <Bubble
              animate={{ opacity: 1 }}
              transition={{ ease: "linear", duration: 0.1 }}
            >
              <p>{item.text}</p>
            </Bubble>
          </div>
        )
      case (!item.classname):
        return (
          <div key={index} className="bubble-container mt-4">
            <AnimatePresence>
              {isVisible &&
                <Bubble
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "linear", duration: 0.15 }}
                  classname="h-14 typing-indicator"
                >
                  <span /><span /><span />
                </Bubble>
              }
            </AnimatePresence>
            {/* Message */}
            {!isVisible &&
              <Bubble
                classname={item.classname}
                initial={{ opacity: 0.75 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                <p>{item.text}</p>
              </Bubble>
            }
          </div>
        )
      default:
        return null;
    }
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