import { ChatButtonProps } from "../interfaces/ChatBox"

const UseChat = async ({ messages, setMessages, setButtons, setFormData, formData }: any) => {

  const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const Button = ({ text, reply, options, formProps }: ChatButtonProps) => {
    const obj = {
      type: "button",
      text: text,
      onClick: async () => {
        // Clear previous buttons
        setButtons([]);
        // Set user response [confirms choice]
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: text }).user,
        ]));
        await delay(500);
        // Set zero response
        if (reply) {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: reply }).zero
          ]));
        }
        // Set new buttons if applicable
        if (options) {
          await delay(1000);
          setButtons(() => ([...options]))
        }
        // Set formData if applicable
        setFormData({ ...formProps })
      }
    }

    return obj;
  }

  const messageSentButton = () => {
    return Button({
      text: "Yes",
      reply: "Your message has been sent, thanks for reaching out!"
    })
  }

  const response = ({ text }: any) => {
    const obj = {
      user: {
        type: "bubble",
        text: text,
        classname: "self-end"
      },
      zero: {
        type: "bubble",
        text: text,
      }
    }

    return obj;
  }

  if (formData.loop === false) {
    switch (true) {
      case (messages.length === 0):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Hi, how can I help you?" }).zero
        ]));
        await delay(2000);
        setButtons(() => ([
          Button({
            text: "Contact the Numero team",
            reply: `Let me fill a contact form for you.\nFirst, can I get your full name please?`,
            formProps: { ...formData, toggle: true, status: "name" }
          }),
          Button({
            text: "???",
            reply: "01010101"
          })
        ]));
        break;

      // Name
      case (formData.toggle && formData.status === "name" && formData.name !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.name }).user,
          response({ text: `Thank you, ${formData.name}. Did I get your name correct?` }).zero
        ]));
        setButtons(() => ([
          Button({
            text: "Yes",
            reply: "Great, now please tell me your email address",
            formProps: { ...formData, status: "email" }
          }),
          Button({
            text: "No",
            reply: "Oh, I'm sorry! Could you please enter your name again?",
            formProps: { ...formData, name: "" }
          })
        ]));
        break;

      // Email
      case (formData.toggle && formData.status === "email" && formData.email !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.email }).user,
          response({ text: `Thank you. ${formData.email}\nDid I get your email address correct?` }).zero
        ]));
        setButtons(() => ([
          Button({
            text: "Yes",
            reply: "Awesome, would you like to leave a message?",
            options: [
              Button({
                text: "Yes",
                reply: "Please share what you would like to send",
                formProps: { ...formData, status: "message" }
              }),
              // Needs to be updated [not correct logic]
              Button({
                text: "No",
                reply: `Name: ${formData.name}\nEmail: ${formData.email}\nIs this correct?`,
                options: [
                  messageSentButton(),
                  Button({
                    text: "No",
                    reply: "Oh, I'm sorry! Please tell me where the issue is:"
                  })]
              })
            ]
          }),
          Button({
            text: "No",
            reply: "Oh, I'm sorry! Could you please enter your email again?",
            formProps: { ...formData, email: "" }
          })
        ]));
        break;

      // Message
      case (formData.toggle && formData.status === "message" && formData.message !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.message }).user,
          response({ text: `${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?` }).zero
        ]));
        setButtons(() => ([
          messageSentButton(),
          Button({
            text: "No",
            formProps: { ...formData, loop: true, status: "loop" }
          })
        ]));
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
        setButtons([
          Button({
            text: "Name",
            reply: "Got it. Let's change your name. Please reenter your name",
            formProps: { ...formData, name: "", status: "name" }
          }),
          Button({
            text: "Email",
            reply: "Got it. Let's change your email. Please reenter your email",
            formProps: { ...formData, email: "", status: "email" }
          }),
          Button({
            text: "Message",
            reply: "Got it. Let's change your message. Please reenter your message",
            formProps: { ...formData, message: "", status: "message" }
          })
        ]);
        break;

      // Name
      case (formData.status === "name" && formData.name !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.name }).user,
          response({ text: `Thank you for your input.\n${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?` }).zero
        ]));
        setButtons(() => ([
          messageSentButton(),
          Button({
            text: "No",
            formProps: { ...formData, status: "loop" }
          })
        ]));
        break;

      // Email
      case (formData.status === "email" && formData.email !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.email }).user,
          response({ text: `Thank you for your input.\n${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?` }).zero
        ]));
        setButtons(() => ([
          messageSentButton(),
          Button({
            text: "No",
            formProps: { ...formData, status: "loop" }
          })
        ]));
        break;

      // Message
      case (formData.status === "message" && formData.message !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: formData.message }).user,
          response({ text: `Thank you for your input.\n${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?` }).zero
        ]));
        setButtons(() => ([
          messageSentButton(),
          Button({
            text: "No",
            formProps: { ...formData, status: "loop" }
          })
        ]));
        break;
      default:
        return messages;
    }
  }
}

export { UseChat }