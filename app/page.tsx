import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-12 sm:p-12 md:pd-24 overscroll-none">
      <Image
        src="/construction.png"
        alt="Under Construction"
        className="w-full max-w-lg h-auto mt-[-20px]"
        width={100}
        height={24}
        priority
        unoptimized
        draggable="false"
      />
    </main>
  );
}
