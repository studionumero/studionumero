import { ChatBox } from "../components/Chat/ChatBox"

import { motion, AnimatePresence } from "framer-motion"

const Contact = () => {

  return (
    <>
      <div className="bubble-container">

        <motion.div className="absolute bottom-0 right-0 
            bg-black w-[calc(100%-32px)] h-14 z-0 
            rounded-3xl mx-4"
          animate={{ y: [0, -10, 0], color: ["#000", "bg-red-500", "#000"] }}
          transition={{ ease: "linear", duration: 0.4 }}
        />
      </div>

      <div className="flex flex-col mt-20 items-center">
        <ChatBox />
      </div>
    </>
  )
}

export { Contact }