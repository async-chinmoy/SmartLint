'use client';
import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
      <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center gap-2">
        <Code2 className="w-6 h-6 text-blue-400" />
        <Link href="/"><span className="text-lg font-bold">SmartLint AI</span></Link>
      </motion.div>
      <motion.nav 
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ duration: 2 , delay: 0.5}}
      className="flex gap-12 text-sm font-medium ">
        <Link href="/features" className="hover:text-blue-400 transition tracking-wider">Features</Link>
        <Link href="/how" className="hover:text-blue-400 transition tracking-wider">How It Works</Link>
        <Link href="/contact" className="hover:text-blue-400 transition tracking-wider">Contact</Link>
      </motion.nav>
      <div>
        <SignedOut>
          <SignInButton mode="modal" redirecturl="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white font-semibold transition">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Navbar