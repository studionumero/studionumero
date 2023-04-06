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

interface ChatButtonProps {
  text: string;
  reply?: string;
  options?: any;
  formProps?: any;
}

export type { MessageProps, ButtonProps, ChatButtonProps }