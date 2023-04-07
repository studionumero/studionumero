import { ChatBox } from "../components/Chat/ChatBox"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";


const Contact = () => {
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

  return (
    <>
      <div className="bubble-container">
          {/* Typing indicator */}
          <AnimatePresence>
            {isVisible && (
              <>
                <Bubble
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "linear", duration: 0.15 }}
                  classname="h-14 typing-indicator"
                >
                  <span /><span /><span />
                </Bubble>
              </>

            )}
          </AnimatePresence>
          {/* Message */}
          <>
          {!isVisible && (
            <>
              <Bubble
                initial={{ opacity: 0.75 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                <p>Hey, how are you?</p>
              </Bubble>
            </>

          )}
          </>

      </div>


      <div className="flex flex-col mt-20 items-center">
        <ChatBox />
      </div>
    </>
  )
}

export { Contact }



{/* <motion.div className="absolute bottom-0 right-0 
bg-black w-[calc(100%-32px)] h-14 z-0 
rounded-3xl mx-4"
  animate={{ y: [0, -10, 0], color: ["#000", "bg-red-500", "#000"] }}
  transition={{ ease: "linear", duration: 0.4 }}
/> */}