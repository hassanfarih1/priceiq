import { UserButton, SignInButton, SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <div className='flex flex-row justify-between mt-6 mx-4 md:mt-10 md:mx-32 items-center'>
      {/* Logo */}
      <Link href='/' className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
        Price<span className='text-byellow'>IQ</span>
      </Link>

      {/* Links and Clerk Buttons */}
      <div className='flex space-x-4 md:space-x-8 items-center'>
        <div className='text-sm sm:text-base md:text-lg space-x-2 sm:space-x-4'>
          <Link href='/Community'>Community</Link>

          {/* Show Sign In button if the user is not signed in */}
          <SignedOut>
            <SignInButton mode="modal">
              <span className='cursor-pointer'>Sign in</span>
            </SignInButton>
          </SignedOut>

          {/* Show user menu if the user is signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Show Get Started/Sign Up button if the user is not signed in */}
        <SignedOut>
          <SignUpButton mode="modal">
            <button className='bg-byellow px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base md:text-lg rounded'>
              Get started
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}
