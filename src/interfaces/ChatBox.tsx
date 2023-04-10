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
  reply?: any[];
  // reply2?: string;
  options?: any;
  formProps?: any;
  clear?: boolean;
}

export type { MessageProps, ButtonProps, ChatButtonProps }