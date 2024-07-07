import Image from "next/image";

export default function Test1() {
  return (
    <main className="flex min-h-screen items-center justify-center overscroll-none">
      <Image
        src="/aero-test-1.png"
        alt="Aero test 1"
        width={279}
        height={685}
        priority
        unoptimized
        draggable="false"
      />
    </main>
  );
}
