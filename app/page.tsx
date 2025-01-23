'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-20 p-4 xl:p-0 xl:gap-y-40 xl:w-[880px]">
      <Header />
      <Figure />
      <Projects />
      <Footer />
    </div>
  );
}

const Button = ({ show }: any) => {
  return (
    <button
      type="button"
      className={`${show} flex items-center justify-center gap-4 tracking-[.1px] text-primary h-14 w-[156px] rounded-2xl bg-surface-container-high`}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = 'https://bsky.app/profile/aeroapp.bsky.social';
      }}
    >
      <Image
        src="/bluesky_logo.svg"
        alt="Bluesky logo"
        className="color-primary"
        width={20}
        height={20}
        priority
        unoptimized
        draggable="false"
      />
      <span>Learn more</span>
    </button>
  )
}

const Social = ({ href, text, src, alt, width, height }: any) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
      className="xl:flex xl:flex-row xl:align-middle xl:items-center"
    >
      <div className="flex m-1 justify-center h-10 w-10 rounded-full border-dark-outline border-[1px] xl:border-0">
        <Image
          src={src}
          alt={alt}
          className="brightness-200"
          width={width}
          height={height}
          priority
          unoptimized
          draggable="false"
        />
      </div>
      <span className="hidden xl:inline-block xl:align-middle">{text}</span>
    </button>
  )
}

const Header = () => {
  return (
    <header>
      <h1 className="uppercase font-black text-sm mb-4 xl:hidden">STUDIO<br />NUMERO</h1>
      <div className="grid grid-cols-3 xl:grid-cols-12 xl:gap-x-6">
        <div className="col-span-2 pt-8 xl:pt-0 xl:grid xl:col-span-8 xl:grid-cols-8 xl:gap-x-6">
          <div className="pb-2 xl:pb-0 xl:col-span-2 xl:justify-self-end">We create</div>
          <div className="xl:col-span-6 xl:mt-[-4px]">
            <strong className="font-normal uppercase text-4xl leading-[44px] xl:text-[45px] xl:leading-[52px]">FUN.</strong><br />
            <strong className="font-normal uppercase text-4xl leading-[44px] xl:text-[45px] xl:leading-[52px]">PURPOSE.</strong><br />
            <strong className="font-normal uppercase text-4xl leading-[44px] xl:text-[45px] xl:leading-[52px]">COMMUNITY.</strong><br />
          </div>
        </div>
        <div className="justify-self-end h-[111px] w-[111px] xl:col-span-2 xl:justify-self-start xl:h-[141px] xl:w-[141px] relative">
          <Image
            src="/0_.svg"
            alt=":0"
            className=""
            fill
            priority
            unoptimized
            draggable="false"
          />
        </div>
      </div>
    </header>
  )
}

const Figure = () => {
  return (
    <section className="xl:grid xl:grid-cols-12 xl:gap-x-6">
      <h3 className="text-xl mb-[26px] xl:hidden xl:text-[28px] xl:leading-[38px] xl:col-end-13 xl:col-span-4">We make small steps <br />to build a big dream.</h3>
      <div className="flex flex-col gap-y-[52px] xl:grid xl:col-start-3 xl:col-span-10 xl:grid-cols-10 xl:place-content-end">
        <figure className="flex flex-col gap-y-4 xl:grid xl:col-span-10 xl:grid-cols-10 xl:gap-x-6 xl:content-end">
          <div className="grid grid-cols-2 gap-4 xl:col-span-6 xl:grid-cols-2 xl:gap-x-6">
            <Image
              src="/tomas_working.svg"
              alt="Tomas working"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              unoptimized
              draggable="false"
            />
            <Image
              src="/dina_working.svg"
              alt="Dina working"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              unoptimized
              draggable="false"
            />
          </div>
          <div className="xl:grid xl:col-span-4 xl:grid-cols-4 xl:grid-col-rows-2">
            <h3 className="hidden text-xl mb-[26px] xl:text-[28px] xl:leading-[38px] xl:col-span-4">We make small steps <br />to build a big dream.</h3>
            <figcaption className="tracking-[.25px] xl:hidden">We started as two friends doing <br />our best to survive.</figcaption>
            <figcaption className="tracking-[.25px] hidden xl:text-sm xl:flex xl:self-end xl:whitespace-nowrap xl:col-span-2">We started as two friends doing our best <br />to survive.</figcaption>
          </div>
        </figure>

        <figure className="flex flex-col gap-y-4 xl:grid xl:col-span-10 xl:grid-cols-10 xl:gap-x-6">
          <div className="grid grid-cols-2 gap-4 xl:col-span-6 xl:grid-cols-2 xl:gap-x-6">
            <Image
              src="/tomas_room.svg"
              alt="Tomas room"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              unoptimized
              draggable="false"
            />
            <Image
              src="/dina_room.svg"
              alt="Dina room"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              unoptimized
              draggable="false"
            />
          </div>
          <figcaption className="tracking-[.25px] xl:text-sm xl:flex xl:self-end xl:whitespace-nowrap xl:col-span-2">Wanting to change our lives for the better, <br />and the lives of the people around us.</figcaption>
        </figure>

        <figure className="flex flex-col gap-y-4 xl:grid xl:col-span-10 xl:grid-cols-10 xl:gap-x-6">
          <div className="grid grid-cols-1 gap-4 xl:col-span-6 xl:gap-x-6">
            <Image
              src="/family.svg"
              alt="Family"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              unoptimized
              draggable="false"
            />
          </div>
          <figcaption className="tracking-[.25px] xl:text-sm xl:flex xl:self-end xl:whitespace-nowrap xl:col-span-2">With the support of our friends and family, <br />with the belief in our vision and our team, <br />we made our dream of Numero come true.</figcaption>
        </figure>
      </div>
    </section>
  )
}

const Projects = () => {
  return (
    <section className="flex flex-col gap-14">
      <div className="flex flex-col gap-2 xl:grid xl:gap-x-6 xl:grid-cols-12 xl:content-center">
        <h4 className="tracking-[.1px] xl:col-span-2 xl:justify-self-end xl:text-sm xl:pt-5">Projects</h4>
        <h3 className="text-2xl xl:col-span-4 xl:pt-3">Aero/ in development</h3>
        <Button show="hidden xl:flex xl:col-end-13 xl:justify-self-end" />
        <div className="flex flex-col items-center gap-8 xl:col-start-3 xl:col-span-6 pt-16">
          <Image
            src="/aero_construction.svg"
            alt="Aero construction"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            unoptimized
            draggable="false"
          />
          <Button show="xl:hidden" />
        </div>
      </div>

    </section>
  )
}

const Footer = () => {
  return (
    <footer className="flex flex-row justify-evenly mb-10">
      <Social
        href="mailto:contact@studionumero.com"
        text="contact@studionumero.com"
        src="/email_logo.svg"
        alt="Email"
        width={20}
        height={16}
      />
      <Social
        href="https://bsky.app/profile/studionumero.bsky.social"
        text="@studionumero.bsky.social"
        src="/bluesky_logo.svg"
        alt="Bluesky"
        width={20}
        height={20}
      />
      <Social
        href="https://www.patreon.com/studionumero"
        text="patreon.com/studionumero"
        src="/patreon_logo.svg"
        alt="Patreon"
        width={18}
        height={18}
      />
    </footer>
  )
}


{/* <main className="flex min-h-screen items-center justify-center p-12 sm:p-12 md:pd-24 overscroll-none">
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
      </main> */}