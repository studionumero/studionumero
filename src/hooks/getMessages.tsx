const getMessages = ({ messages, setMessages, setButtons, setFormData, formData }: any) => {

  const button = {
    contact: {
      type: "button",
      text: "Contact the Numero team",
      onClick: () => {
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: "Contact the Numero team",
            classname: "self-end"
          },
          {
            type: "bubble",
            text: "Got you!"
          },
          {
            type: "bubble",
            text: `Let me fill a contact form for you.\nFirst, can I get your full name please?`
          }
        ]));
        setFormData({ ...formData, toggle: true });
        setButtons([]);
      }
    },
    question: {
      type: "button",
      text: "???",
      onClick: () => {
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: "01010101"
          }
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
            userResponse.yes,
            {
              type: "bubble",
              text: "Great, now please tell me your email address",
            },
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
            userResponse.no,
            {
              type: "bubble",
              text: "Oh, I'm sorry! Could you please enter your name again?",
            },
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
            userResponse.yes,
            {
              type: "bubble",
              text: "Awesome, would you like to leave a message?",
            },
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
            userResponse.no,
            {
              type: "bubble",
              text: "Oh, I'm sorry! Could you please enter your email again?",
            },
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
            userResponse.yes,
            {
              type: "bubble",
              text: "Please share what you would like to send",
            },
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
            userResponse.no,
            {
              type: "bubble",
              text: "Thank you for your input",
            },
            {
              type: "bubble",
              text: `Name: ${formData.name}\nEmail: ${formData.email}\nIs this correct?`,
            },
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
            userResponse.yes,
            {
              type: "bubble",
              text: "Your message has been sent, thanks for reaching out!",
            },
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
            userResponse.no,
            {
              type: "bubble",
              text: "Oh, I'm sorry! Please tell me where the issue is:",
            }
          ]));
          setButtons([]);
        }
      },
    }
  };

  // strict case for empty name, email, and message [NO OVERLAP]

  if (formData.loop === false) {
    switch (true) {
      case (messages.length === 0):
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: "Hi, how can I help you?"
          }
        ]));
        setButtons(() => ([
          button.contact,
          button.question
        ]));
        break;
      case (formData.toggle && formData.name === ""):
        
        break;
      case (formData.toggle && formData.name !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: formData.name,
            classname: "self-end"
          },
          {
            type: "bubble",
            text: `Thank you, ${formData.name}. Did I get your name correct?`
          }
        ]));
        setButtons(() => ([
          button.name.yes,
          button.name.no
        ]));
        break;
      case (formData.toggle && formData === ""):
        break;
      case (formData.toggle && formData.email !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: formData.email,
            classname: "self-end"
          },
          {
            type: "bubble",
            text: `Thank you. ${formData.email}\nDid I get your email address correct?`
          }
        ]));
        setButtons(() => ([
          button.email.yes,
          button.email.no
        ]));
        break;
      case (formData.toggle && formData.name !== "" && formData.email !== "" && formData.message !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: formData.message,
            classname: "self-end"
          },
          {
            type: "bubble",
            text: `${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?`
          }
        ]));
        setButtons(() => ([
          {
            type: "button",
            text: "Yes",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                userResponse.yes,
                {
                  type: "bubble",
                  text: "Your message has been sent!\nThank you for reaching out to us :)",
                },
              ]));
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "No",
            onClick: () => setFormData({ ...formData, loop: true })
          },
        ]));
        break;
      default:
        return messages;
    }
  }
  else if (formData.loop === true) {
    switch (true) {
      case (formData.name !== "" && formData.email !== "" && formData.message !== ""):
        setMessages((currValue: any) => ([
          ...currValue,
          userResponse.no,
          {
            type: "bubble",
            text: "Oh, I'm sorry! Please tell me where the issue is",
          },
        ]));
        setButtons([
          {
            type: "button",
            text: "Name",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                {
                  type: "bubble",
                  text: "Name",
                  classname: "self-end"
                },
                {
                  type: "bubble",
                  text: "Got it. Let's change your name. Please reenter your name",
                },
              ]));
              setFormData({ ...formData, name: "" });
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "Email",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                {
                  type: "bubble",
                  text: "Email",
                  classname: "self-end"
                },
                {
                  type: "bubble",
                  text: "Got it. Let's change your email. Please reenter your email",
                },
              ]));
              setFormData({ ...formData, email: "" });
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "Message",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                {
                  type: "bubble",
                  text: "Message",
                  classname: "self-end"
                },
                {
                  type: "bubble",
                  text: "Got it. Let's change your message. Please reenter your message",
                },
              ]));
              setFormData({ ...formData, message: "" });
              setButtons([]);
            }
          },
        ]);
        break;
      case (formData.name === ""):
        setMessages((currValue: any) => ([
          ...currValue,
          {
            type: "bubble",
            text: formData.name,
            classname: "self-end"
          },
          {
            type: "bubble",
            text: `Thank you for your input.\n${formData.name}\n${formData.email}\n${formData.message}\nIs this correct?`
          }
        ]));
        setButtons(() => ([
          {
            type: "button",
            text: "Yes",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                userResponse.yes,
                {
                  type: "bubble",
                  text: "Your message has been sent!\nThank you for reaching out to us :)",
                },
              ]));
              setButtons([]);
            }
          },
          {
            type: "button",
            text: "No",
            onClick: () => {
              setMessages((currValue: any) => ([
                ...currValue,
                userResponse.no,
              ]));
              setButtons([]);
            }
          }
        ]));
        break;
      default:

    }
  }
}

const userResponse = {
  yes: {
    type: "bubble",
    text: "Yes",
    classname: "self-end"
  },
  no: {
    type: "bubble",
    text: "No",
    classname: "self-end"
  }
};



export { getMessages }