import Image from "next/image";
import { useState } from "react";

export const Logo = () => {
  const emojis = ["0_.svg", "_B.svg"];
  const [i, setIndex] = useState(0);
  const [src, setSrc] = useState(`${emojis[i]}`);

  function handleClick() {
    const increment = (i + 1) % emojis.length;

    setSrc(`${emojis[increment]}`);
    setIndex(increment)
    // console.log(i)
  }

  return (
    <button className="justify-self-end h-[111px] w-[111px] xl:col-span-2 xl:justify-self-start xl:h-[141px] xl:w-[141px] relative"
      onClick={handleClick}
    >
      <Image
        src={src}
        alt=":0"
        className=""
        fill
        priority
        unoptimized
        draggable="false"
      />
    </button>
  )
}