'use client'

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

export interface TypewriterProps {
  words: string[]
  loop?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  deletedDelaySpeed?: number
}

export interface TypewriterRef {
  reset: () => void
}

export const Typewriter = forwardRef<TypewriterRef, TypewriterProps>(
  (
    {
      words,
      loop = true,
      typeSpeed = 80,
      deleteSpeed = 40,
      delaySpeed = 2000,
      deletedDelaySpeed = 500,
    },
    ref
  ) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
      let timer: NodeJS.Timeout
      const fullWord = words[currentWordIndex]

      if (isPaused) {
        const delay = isDeleting ? deletedDelaySpeed : delaySpeed
        timer = setTimeout(() => {
          setIsPaused(false)
          if (isDeleting) {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1 < words.length ? prev + 1 : (loop ? 0 : prev)))
          } else {
            setIsDeleting(true)
          }
        }, delay)

        return () => clearTimeout(timer)
      }

      const tick = () => {
        if (!isDeleting) {
          if (currentText === fullWord) {
            setIsPaused(true)
          } else {
            setCurrentText(fullWord.substring(0, currentText.length + 1))
          }
        } else {
          if (currentText === '') {
            setIsPaused(true)
          } else {
            setCurrentText(fullWord.substring(0, currentText.length - 1))
          }
        }
      }

      timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)

      return () => clearTimeout(timer)
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, loop, typeSpeed, deleteSpeed, delaySpeed, deletedDelaySpeed])

    useImperativeHandle(ref, () => ({
      reset: () => {
        setCurrentWordIndex(0)
        setCurrentText('')
        setIsDeleting(false)
        setIsPaused(false)
      }
    }))

    return (
      <span className="inline-flex items-center">
        <span>{currentText || '\u200B'}</span>
        <span className="typewriter-cursor ml-1 font-extralight text-cyan-400 select-none">|</span>
        <style>{`
          @keyframes typewriterBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .typewriter-cursor {
            animation: typewriterBlink 0.8s step-end infinite;
          }
        `}</style>
      </span>
    )
  }
)

Typewriter.displayName = 'Typewriter'
