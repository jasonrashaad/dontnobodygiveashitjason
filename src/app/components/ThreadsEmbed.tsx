'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ThreadsEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [0, -8, 0],
        boxShadow: [
          "0 0 0px rgba(0,255,0,0)",
          "0 0 15px rgba(0,255,0,0.2)",
          "0 0 0px rgba(0,255,0,0)"
        ]
      }}
      transition={{ 
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="w-full max-w-[350px] mx-auto my-8"
    >
      <Link 
        href="https://www.threads.net/@jasonrashaad" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Image 
          src="/threads-post.JPG"
          alt="Threads post"
          width={350}
          height={350}
          className="rounded-lg cursor-pointer w-full h-auto"
        />
      </Link>
    </motion.div>
  );
}
