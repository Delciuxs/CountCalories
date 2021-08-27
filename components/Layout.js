import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Layout({ children }) {
  const [toogleMenuBar, setToggleMenuBar] = useState(false);

  return (
    <section className="container is-widescreen mt-4 ml-3 mb-4 mr-3">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a>
              <Image src="/chef.jpg" alt="Logo" width={60} height={60} />
            </a>
          </Link>

          <a
            role="button"
            className={`navbar-burger ${toogleMenuBar && " is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="tabs"
            onClick={() => setToggleMenuBar(!toogleMenuBar)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="tabs"
          className={`navbar-menu ${toogleMenuBar && " is-active"}`}
        >
          <div className="navbar-start">
            <Link href="/">
              <a
                className="navbar-item"
                onClick={() => setToggleMenuBar(false)}
              >
                Home
              </a>
            </Link>
            <Link href="/inventory">
              <a
                className="navbar-item"
                onClick={() => setToggleMenuBar(false)}
              >
                Inventory
              </a>
            </Link>
            <Link href="/track">
              <a
                className="navbar-item"
                onClick={() => setToggleMenuBar(false)}
              >
                Track Food
              </a>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </section>
  );
}
