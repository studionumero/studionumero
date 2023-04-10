import { ChatButtonProps } from "../interfaces/ChatBox"

const UseChat = async ({ messages, setMessages, setButtons, setFormData, formData }: any) => {

  const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  // Set messages if applicable
  if (formData.clear === true) {
    setFormData({
      name: "",
      email: "",
      message: "",
      status: "",
      toggle: false,
      loop: false,
      clear: false
    })
    setMessages([]);
    await delay(1900);
    return;
  }

  const Button = ({ text, reply, options, formProps }: ChatButtonProps) => {
    return {
      type: "button",
      text: text,
      onClick: async () => {
        // Clear previous buttons
        setButtons([]);
        // Set user response (confirms choice)
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: text }).user,
        ]));
        await delay(500);
        // Set zero response
        if (reply) {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: reply[0] }).zero
          ]));
          // Set 2nd zero response
          if (reply[1]) {
            await delay(1650);
            setMessages((currValue: any) => ([
              ...currValue,
              response({ text: reply[1] }).zero
            ]));
          }
        }
        // Set new buttons if applicable
        if (options) {
          await delay(1900);
          setButtons(() => ([...options]));
        }
        // Set formData if applicable
        if (formProps) setFormData({ ...formProps });
      }
    }
  }

  const loopButtons = () => {
    return [
      Button({
        text: "Yes",
        reply: ["Your message has been sent, thanks for reaching out!"],
        formProps: { ...formData, clear: true },
      }),
      Button({
        text: "No",
        formProps: { ...formData, loop: true, status: "loop" }
      })
    ]
  }

  const correctMessage = async (data: string) => {
    setMessages((currValue: any) => ([
      ...currValue,
      response({ text: data }).user
    ]));
    await delay(500);
    setMessages((currValue: any) => ([
      ...currValue,
      response({
        text: `Name:  ${formData.name}\nEmail:  ${formData.email}\nMessage:  ${formData.message}`}).zero
    ]))
    await delay(1900);
    setMessages((currValue: any) => ([
      ...currValue,
      response({ text: "Is this correct?" }).zero
    ]))
    await delay(1900);
  }

  const response = ({ text }: any) => {
    return {
      user: { type: "bubble", text, from: "user" },
      zero: { type: "bubble", text, from: "zero" }
    }
  }

  if (formData.loop === false) {
    switch (true) {
      case (messages.length === 0):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Hi, how can I help you?" }).zero
        ]));
        await delay(1900);
        setButtons(() => ([
          Button({
            text: "Contact the Numero team",
            reply: [
              "Let me fill out a contact form for you!",
              "What is your full name?"
            ],
            formProps: { ...formData, toggle: true, status: "name" }
          }),
          Button({
            text: "???",
            reply: ["01010101"]
          })
        ]));
        break;

      // Name
      case (formData.toggle && formData.status === "name" && formData.name !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.name }).user,
        ]));
        await delay(500);
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Great, now please tell me your email address" }).zero
        ]))
        setFormData({ ...formData, status: "email" })
        break;

      // Email
      case (formData.toggle && formData.status === "email" && formData.email !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.email }).user
        ]));
        await delay(500);
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Would you like to leave a message?" }).zero
        ]))
        await delay(1900);
        setButtons(() => ([
          Button({
            text: "Yes",
            reply: ["Please share your message"],
            formProps: { ...formData, status: "message" }
          }),
          Button({
            text: "No",
            reply: [
              `Name: ${formData.name}\nEmail: ${formData.email}`,
              "Is this correct?"
            ],
            options: loopButtons()
          })
        ]));
        break;

      // Message
      case (formData.toggle && formData.status === "message" && formData.message !== ""):
        await correctMessage(formData.message);
        setButtons(loopButtons);
        break;

      default:
        return messages;
    }
  }

  // Loop
  else if (formData.loop === true) {
    switch (true) {
      case (formData.status === "loop"):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Oh, I'm sorry! Please tell me where the issue is" }).zero
        ]));
        await delay(1900);
        setButtons([
          Button({
            text: "Name",
            reply: ["Please enter your name"],
            formProps: { ...formData, name: "", status: "name" }
          }),
          Button({
            text: "Email",
            reply: ["Please enter your email"],
            formProps: { ...formData, email: "", status: "email" }
          }),
          Button({
            text: "Message",
            reply: ["Please enter your message"],
            formProps: { ...formData, message: "", status: "message" }
          })
        ]);
        break;

      // Loop name
      case (formData.status === "name" && formData.name !== ""):
        await correctMessage(formData.name);
        setButtons(loopButtons);
        break;

      // Loop email
      case (formData.status === "email" && formData.email !== ""):
        await correctMessage(formData.email);
        setButtons(loopButtons);
        break;

      // Loop message
      case (formData.status === "message" && formData.message !== ""):
        await correctMessage(formData.message);
        setButtons(loopButtons);
        break;

      default:
        return messages;
    }
  }
}

export { UseChat }