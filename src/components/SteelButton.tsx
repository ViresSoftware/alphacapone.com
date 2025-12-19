'use client'

import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type SteelButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  href?: string
  onClick?: () => void
  className?: string
  fullWidth?: boolean
}

export function SteelButton({
  children,
  type = 'button',
  href,
  onClick,
  className,
  fullWidth = false,
}: SteelButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const shineX = useTransform(mouseX, v => v - 100)
  const shineY = useTransform(mouseY, v => v - 100)

  const shineBackground = useMotionTemplate`
    radial-gradient(
      180px circle at ${shineX}px ${shineY}px,
      rgba(255,255,255,0.12),
      transparent 60%
    )
  `

  const baseClasses = cn(
    `
    relative overflow-hidden
    px-6 py-3 rounded-lg
    border border-zinc-700
    bg-gradient-to-b from-zinc-500/90 via-zinc-600/80 to-zinc-800
    text-white font-semibold tracking-wide
    shadow-[0_6px_20px_rgba(0,0,0,0.5)]
    `,
    fullWidth && 'w-full',
    className
  )

  const ButtonInner = (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={baseClasses}
    >
      {/* Permanent steel polish */}
      <div className="absolute inset-0 pointer-events-none
        bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)]
        opacity-60"
      />

      {/* Cursor-following gloss */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: shineBackground, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Inner bevel */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) return <Link href={href}>{ButtonInner}</Link>

  return ButtonInner
}
