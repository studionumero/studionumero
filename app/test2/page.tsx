import Image from "next/image";

export default function Test2() {
  return (
    <main className="flex min-h-screen items-center justify-center overscroll-none">
      <Image
        src="/aero-test-2.png"
        alt="Aero test 2"
        width={279}
        height={685}
        priority
        unoptimized
        draggable="false"
      />
    </main>
  );
}
