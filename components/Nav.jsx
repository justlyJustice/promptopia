"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const initProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    initProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16  pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Prompotia logo"
          className="objecct-contain"
          height={30}
          width={30}
          src="/assets/images/logo.svg"
        />

        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                alt="profile"
                className="rounded-full"
                height={37}
                src="/assets/images/logo.svg"
                width={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? <div className="flex">
        <Image
                alt="profile"
                className="rounded-full"
                height={37}
                src="/assets/images/logo.svg"
                width={37}
              />
        </div>: }
      </div>
    </nav>
  );
};

export default Nav;
