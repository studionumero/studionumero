const getMessages = ({ messages, setMessages, setButtons, setFormData, formData }: any) => {

  const response = ({ text }: any) => {
    const obj = {
      user: {
        type: "bubble",
        text: text,
        classname: "self-end"
      },
      zero: {
        type: "bubble",
        text: text
      }
    }

    return obj;
  }

  const button = {
    contact: {
      type: "button",
      text: "Contact the Numero team",
      onClick: () => {
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Contact the Numero team" }).user,
          response({ text: "Got you!" }).zero,
          response({ text: `Let me fill a contact form for you.\nFirst, can I get your full name please?` }).zero
        ]));
        setFormData({ ...formData, toggle: true, status: "name" });
        setButtons([]);
      }
    },
    question: {
      type: "button",
      text: "???",
      onClick: () => {
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "01010101" }).zero
        ]));
        setButtons([]);
      }
    },
    name: {
      yes: {
        type: "button",
        text: "Yes",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "Yes" }).user,
            response({ text: "Great, now please tell me your email address" }).zero
          ]));
          setButtons([]);
          setFormData({ ...formData, status: "email" });
        }
      },
      no: {
        type: "button",
        text: "No",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "No" }).user,
            response({ text: "Oh, I'm sorry! Could you please enter your name again?" }).zero
          ]));
          setFormData({ ...formData, name: "" });
          setButtons([]);
        }
      },
    },
    email: {
      yes: {
        type: "button",
        text: "Yes",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "Yes" }).user,
            response({ text: "Awesome, would you like to leave a message?" }).zero
          ]));
          setButtons(() => ([
            button.message.yes,
            button.message.no
          ]));
        }
      },
      no: {
        type: "button",
        text: "No",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "No" }).user,
            response({ text: "Oh, I'm sorry! Could you please enter your email again?" }).zero
          ]));
          setFormData({ ...formData, email: "" });
          setButtons([]);
        }
      },
    },
    message: {
      yes: {
        type: "button",
        text: "Yes",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "Yes" }).user,
            response({ text: "Please share what you would like to send" }).zero
          ]));
          setFormData({ ...formData, status: "message" });
          setButtons([]);
        }
      },
      no: {
        type: "button",
        text: "No",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "No" }).user,
            response({ text: "Thank you for your input" }).zero,
            response({ text: `Name: ${formData.name}\nEmail: ${formData.email}\nIs this correct?` }).zero
          ]));
          setButtons(() => ([
            button.form.yes,
            button.form.no
          ]));
        }
      },
    },
    form: {
      yes: {
        type: "button",
        text: "Yes",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "Yes" }).user,
            response({ text: "Your message has been sent, thanks for reaching out!" }).zero
          ]));
          setButtons([]);
        }
      },
      no: {
        type: "button",
        text: "No",
        onClick: () => {
          setMessages((currValue: any) => ([
            ...currValue,
            response({ text: "No" }).user,
            response({ text: "Oh, I'm sorry! Please tell me where the issue is:" }).zero
          ]));
          setButtons([]);
        }
      },
    },
    loop: {
      no: {
        type: "button",
        text: "No",
        onClick: () => {
          setFormData({ ...formData, status: "loop" });
          setButtons([]);
        }
      }
    }
  };

  if (formData.loop === false) {
    switch (true) {
      case (messages.length === 0):
        setMessages((currValue: any) => ([
          ...currValue,
          response({ text: "Hi, how can I help you?" }).zero
        ]));
        setButtons(() => ([
          button.contact,
          button.question
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
          button.name.yes,
          button.name.no
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
          button.email.yes,
          button.email.no
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
          button.form.yes,
          {
            type: "button",
            text: "No",
            onClick: () => setFormData({ ...formData, loop: true, status: "loop" })
          },
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
          response({ text: "No" }).user,
          response({ text: "Oh, I'm sorry! Please tell me where the issue is" }).zero
        ]));
        setButtons([
          {
            type: "button",
            text: "Name",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                response({ text: "Got it. Let's change your name. Please reenter your name" }).zero
              ]));
              setFormData({ ...formData, name: "", status: "name" });
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "Email",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                response({ text: "Got it. Let's change your email. Please reenter your email" }).zero
              ]));
              setFormData({ ...formData, email: "", status: "email" });
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "Message",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                response({ text: "Got it. Let's change your message. Please reenter your message" }).zero
              ]));
              setFormData({ ...formData, message: "", status: "message" });
              setButtons([]);
            }
          },
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
          button.form.yes,
          button.loop.no
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
          button.form.yes,
          button.loop.no
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
          button.form.yes,
          button.loop.no
        ]));
        break;
      default:
        return messages;
    }
  }
}

export { getMessages }