interface MessageProps {
  type: string;
  text: string;
  classname?: string;
}

interface ButtonProps {
  type: string;
  text: string;
  onClick?: React.MouseEventHandler;
}

interface GetMessagesButtonProps {
  text: string;
  reply?: string;
  options?: any;
  formProps?: any;
}

export type { MessageProps, ButtonProps, GetMessagesButtonProps }