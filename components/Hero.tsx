"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Admin", path: "/admin" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="/">
        <Image
          src="assets/logo-dark.svg"
          width={130}
          height={70}
          alt="Placement Cell Logo"
        />
      </a>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black transition-all delay-300 hover:from-gray-600 hover:via-gray-800 hover:to-black">
        <header>
          <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
            <Brand />
          </div>
          <nav
            className={`pb-5 md:text-sm ${
              state
                ? "absolute inset-x-0 top-0 z-20 mx-2 mt-2 rounded-xl bg-gray-800 md:relative md:mx-0 md:mt-0 md:bg-transparent"
                : ""
            }`}
          >
            <div className="mx-auto max-w-screen-xl items-center gap-x-14 px-4 md:flex md:px-8">
              <Brand />
              <div
                className={`mt-8 flex-1 items-center md:mt-0 md:flex ${
                  state ? "block" : "hidden"
                } `}
              >
                <ul className="flex-1 items-center justify-end space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {navigation.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className="text-md text-gray-300 hover:text-gray-400"
                      >
                        <Link href={item.path} className="block">
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-x-1 rounded-full border bg-transparent px-4 py-2 font-medium text-white duration-150 hover:bg-slate-100 hover:text-black active:bg-gray-400 active:text-slate-800 md:inline-flex"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <section className="relative">
          <div className="relative z-10 mx-auto max-w-screen-xl px-4 pb-28 pt-20 md:px-8">
            <div className="mx-auto max-w-4xl space-y-5 text-center">
              <h2 className="mx-auto text-4xl font-bold text-white md:text-5xl md:leading-relaxed">
                Build yourselves a great career with{" "}
                <span className="font-extrabold">Placement Cell JMC</span>
              </h2>
              <p className=" mx-auto max-w-2xl text-gray-400">
                An efficient way for creating and managing job applications
              </p>
              <div className="items-center justify-center gap-5 sm:flex">
                <Link
                  className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white duration-150 hover:bg-sky-400 active:bg-sky-600 sm:mt-0 sm:w-auto"
                  href="/register"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
