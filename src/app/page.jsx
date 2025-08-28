"use client";

import { motion } from "framer-motion";
import { Code2, Github, Twitter, Linkedin, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import image from '../app/code.png'
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col px-20">


      <section className="flex items-center justify-between  my-10 px-6 py-8">
        <div className="flex w-3/5 flex-1 flex-col items-center justify-center text-center px-20 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold  leading-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            AI-Powered Code Reviews,
            <br /> Smarter Development.
          </motion.h1>
          <p className="mt-6 max-w-xl text-gray-400 text-lg">
            Submit your code, let AI detect bugs, optimize performance, and
            improve security — all in real time.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold shadow-lg transition"
            >
              Start Reviewing
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-xl text-lg font-semibold transition flex items-center gap-2"
            >
              <Github className="w-5 h-5" /> GitHub
            </Link>
          </motion.div>
        </div>
        <div className='flex w-2/5 justify-center items-center px-10 py-10'>
          <Image src={image} className="rounded-2xl shadow-lg " width={400} height={400} alt="Code" />
        </div>
      </section>


      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        id="features" className="px-10 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why SmartLint AI?</h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-[#161b22] rounded-2xl shadow-lg hover:shadow-blue-500/20 transition">
            <Cpu className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">AI-Powered Analysis</h3>
            <p className="mt-2 text-gray-400">
              Get instant insights into performance, readability, and code quality.
            </p>
          </div>
          <div className="p-6 bg-[#161b22] rounded-2xl shadow-lg hover:shadow-blue-500/20 transition">
            <ShieldCheck className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Security Checks</h3>
            <p className="mt-2 text-gray-400">
              Detect vulnerabilities before they become production issues.
            </p>
          </div>
          <div className="p-6 bg-[#161b22] rounded-2xl shadow-lg hover:shadow-blue-500/20 transition">
            <Code2 className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">GitHub Integration</h3>
            <p className="mt-2 text-gray-400">
              Automatically review PRs and commits directly from GitHub.
            </p>
          </div>
        </motion.div>
      </motion.section>



      <footer
        id="contact"
        className="px-10 py-10 border-t border-gray-800 text-gray-400 text-sm bg-gradient-to-r from-[#0d1117] via-[#0f141c] to-[#0d1117]"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">SmartLint AI</h3>
            <p className="mt-1 text-gray-500">
              Built with ❤️ using Next.js & OpenAI API
            </p>
          </div>


          <div className="flex gap-4">
            <a
              href="https://github.com/async-chinmoy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/chinmoy-senapoti"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>


          <div className="text-center md:text-right text-xs text-gray-600">
            © {new Date().getFullYear()} SmartLint. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}
