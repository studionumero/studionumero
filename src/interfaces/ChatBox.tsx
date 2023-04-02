interface Message {
  type: string;
  text: string;
  classname?: string;
}

interface Button {
  type: string;
  text: string;
  onClick?: React.MouseEventHandler;
}

export type { Message, Button }