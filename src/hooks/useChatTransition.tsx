const ChatTransition = ({ bubbleRef, messageRef }: any) => {
  const bubble = bubbleRef.current;
  const message = messageRef.current;

  const animate = () => {
    if (bubble !== null && message !== null) {
      bubble.classList.add('opacity-0');

      bubble.addEventListener('transitionend', () => {
        bubble.style.display = 'none';
        bubble.classList.add('hidden');
        
        message.classList.remove('hidden');
        message.classList.add('change');
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }
  }

  setTimeout(() => animate(), 750);

  console.log('ran')
}

export { ChatTransition }