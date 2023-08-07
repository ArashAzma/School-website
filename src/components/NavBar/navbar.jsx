"use client"
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {signOut, useSession} from 'next-auth/react' 

const Navbar = () => {
  const session = useSession();
  return (
      <div
        className="flex justify-between items-center px-10 pt-4 pb-4 bg-[#213555] bg-opacity-20"
      >
        <Link
          href="/"
          className={`text-[28px] text-white border-[#0067A5] font-bold ${styles.title} px-2 first-line:`}
        >
          Shahriar Toos
        </Link>
        <div className="flex gap-x-6 text-white font-semibold text-[24px]">
          <Link
            href="/about"
            className={`border-[#0067A5] ${styles.Underline} right-0 relative`}
          >
            about
          </Link>
          <Link
            href="/students"
            className={`border-[#0067A5] ${styles.Underline} right-0 relative`}
          >
            students
          </Link>
          <Link
            href="/shop"
            className={`border-[#0067A5] ${styles.Underline} right-0 relative`}
          >
            shop
          </Link>
          {session.status!="authenticated" 
            ?
            <Link
              href="/dashboard/login"
              className={`border-[#0067A5] ${styles.Underline} right-0 relative`}
            >
              login
            </Link>
            :
            <button
              className={`border-[#0067A5] ${styles.Underline} right-0 relative`}
              onClick={signOut}
            >
              logout
            </button> 
          }
        </div>
      </div>
  );
};

export default Navbar;
