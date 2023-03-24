const getMessages = ({ messages, setMessages, setButtons, setFormData, formData }: any) => {
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
        {
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
        {
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
        }
      ]));
      break;
    case (formData.toggle && formData.name !== "" && formData.email == ""):
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
        {
          type: "button",
          text: "Yes",
          onClick: () => {
            setMessages((currValue: any) => ([
              ...currValue,
              {
                type: "bubble",
                text: "Yes",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Great, now please tell me your email address",
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
              {
                type: "bubble",
                text: "No",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Oh, I'm sorry! Could you please enter your name again?",
              },
            ]));
            setFormData({ ...formData, name: "" });
            setButtons([]);
          }
        },
      ]));
      break;
    case (formData.toggle && formData.name !== "" && formData.email !== "" && formData.message == ""):
      setMessages((currValue: any) => ([
        ...currValue,
        {
          type: "bubble",
          text: formData.email,
          classname: "self-end"
        },
        {
          type: "bubble",
          text: `Thank you. ${formData.email}. Did I get your email address correct?`
        }
      ]));
      setButtons(() => ([
        {
          type: "button",
          text: "Yes",
          onClick: () => {
            setMessages((currValue: any) => ([
              ...currValue,
              {
                type: "bubble",
                text: "Yes",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Awesome, would you like to leave a message?",
              },
            ]));
            setButtons(() => ([
              {
                type: "button",
                text: "Yes",
                onClick: () => {
                  setMessages((currValue: any) => ([
                    ...currValue,
                    {
                      type: "bubble",
                      text: "Yes",
                      classname: "self-end"
                    },
                    {
                      type: "bubble",
                      text: "Please share what you would like to send",
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
                    {
                      type: "bubble",
                      text: "No",
                      classname: "self-end"
                    },
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
                    {
                      type: "button",
                      text: "Yes",
                      onClick: () => {
                        setMessages((currValue: any) => ([
                          ...currValue,
                          {
                            type: "bubble",
                            text: "Yes",
                            classname: "self-end"
                          },
                          {
                            type: "bubble",
                            text: "Your message has been sent, thanks for reaching out!",
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
                          {
                            type: "bubble",
                            text: "No",
                            classname: "self-end"
                          },
                          {
                            type: "bubble",
                            text: "Oh, I'm sorry! Please tell me where the issue is:",
                          }
                        ]));
                        setButtons([]);
                      }
                    },
                  ]));
                }
              },
            ]));
          }
        },
        {
          type: "button",
          text: "No",
          onClick: () => {
            setMessages((currValue: any) => ([
              ...currValue,
              {
                type: "bubble",
                text: "No",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Oh, I'm sorry! Could you please enter your email again?",
              },
            ]));
            setFormData({ ...formData, email: "" });
            setButtons([]);
          }
        },
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
          text: `Thank you. ${formData.email}. Did I get your email address correct?`
        }
      ]));
      setButtons(() => ([
        {
          type: "button",
          text: "Yes",
          onClick: () => {
            setMessages((currValue: any) => ([
              ...currValue,
              {
                type: "bubble",
                text: "Yes",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Awesome, would you like to leave a message?",
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
              {
                type: "bubble",
                text: "No",
                classname: "self-end"
              },
              {
                type: "bubble",
                text: "Oh, I'm sorry! Could you please enter your email again?",
              },
            ]));
            setFormData({ ...formData, email: "" });
            setButtons([]);
          }
        },
      ]));
      break;
    default:
      return messages;
  }
}

export { getMessages }