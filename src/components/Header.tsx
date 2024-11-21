import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { ArrowRight } from "lucide-react"
const Header = async () => {
  const { userId } = await auth();
  return (
    <ul className='flex justify-between items-center' >
      <li>
        <Link href='/'>
          Home
        </Link>
      </li>
      <div className='flex justify-between gap-4 items-center'>
        {userId ? (<>

          <Link
            href="/dashboard"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1",
            })}
          >
            Dashboard <ArrowRight className="ml-1.5 size-4" />
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>



        </>) : (<>

          <Link
            href="/pricing"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            Pricing
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            Sign in
          </Link>

          <div className="h-8 w-px bg-gray-200" />

          <Link
            href="/sign-up"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1.5",
            })}
          >
            Sign up <ArrowRight className="size-4" />
          </Link></>)}
      </div>

    </ul>
  )
}

export default Header