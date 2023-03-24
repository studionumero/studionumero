const getMessages = ({ messages, setMessages, setFormData, formData }: any) => {

  switch (true) {
    case (messages.length === 0):
      setMessages((currValue: any) => ([
        ...currValue,
        {
          type: "bubble",
          text: "Hi, how can I help you?"
        },
        {
          type: "button",
          text: "Contact the Numero team",
          onClick: () => {
            setMessages(() => ([
              ...[{
                type: "bubble",
                text: "Hi, how can I help you?"
              }],
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
            // setContact(true);
            setFormData({...formData, toggle: true});
          }
        },
        {
          type: "button",
          text: "???",
          onClick: () => {
            setMessages(() => ([
              ...[{
                type: "bubble",
                text: "Hi, how can I help you?"
              }],
              {
                type: "bubble",
                text: "01010101"
              }
            ]));

          }
        }
      ]));
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
        },
        {
          type: "button",
          text: "Yes",
          onClick: () => {
            setMessages(() => ([
              ...[{
                type: "bubble",
                text: "Hi, how can I help you?"
              }],
              {
                type: "bubble",
                text: "Yes",
                classname: "self-end"
              },
            ]))
          }
        },
        {
          type: "button",
          text: "No",
          onClick: () => {
            setMessages(() => ([
              ...[{
                type: "bubble",
                text: "Hi, how can I help you?"
              }],
              {
                type: "bubble",
                text: "No",
                classname: "self-end"
              },
            ]))
          }
        },
      ]));
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
          text: "Woah, that's a cool name!"
        },
        {
          type: "bubble",
          text: "What's your email?"
        },
      ]));
      break;
    default:
      return messages;
  }
}

export { getMessages }