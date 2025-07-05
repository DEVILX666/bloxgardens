"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Lock } from "lucide-react"

interface HeaderProps {
  onCtaClick: () => void
  playClickSound: () => void
}

export default function Header({ onCtaClick, playClickSound }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    playClickSound()

    // Toggle body scroll
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const handleNavLinkClick = () => {
    playClickSound()
    setIsMenuOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <header className="bg-[var(--forest-green)] py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="https://aldi.today/photo/websitelogo.webp"
            alt="Grow a Garden"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <div className="font-['Fredoka_One'] text-white text-lg">Grow a Garden</div>
            <div className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> Secure
            </div>
          </div>
        </div>

        {isMobile && (
          <button
            className={`relative z-50 w-7 h-5 flex flex-col justify-between ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-full bg-white rounded transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span className={`h-0.5 w-full bg-white rounded transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span
              className={`h-0.5 w-full bg-white rounded transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        )}

        <nav
          className={`${isMobile ? "fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[var(--forest-green)] shadow-xl flex flex-col justify-center items-center gap-6 p-10 transition-transform duration-300 z-40" : "flex items-center gap-6"} ${isMobile && !isMenuOpen ? "translate-x-full" : "translate-x-0"}`}
        >
          <Link
            href="#how-it-works"
            className="text-white font-semibold hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
            onClick={handleNavLinkClick}
            onMouseEnter={playClickSound}
          >
            How It Works
          </Link>
          <Link
            href="#items"
            className="text-white font-semibold hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
            onClick={handleNavLinkClick}
            onMouseEnter={playClickSound}
          >
            Claim Items
          </Link>
          <Link
            href="#testimonials"
            className="text-white font-semibold hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
            onClick={handleNavLinkClick}
            onMouseEnter={playClickSound}
          >
            Testimonials
          </Link>
          <button
            className="bg-[var(--sunshine-yellow)] text-[var(--forest-green)] font-bold py-2 px-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            onClick={onCtaClick}
            onMouseEnter={playClickSound}
          >
            Start Now
          </button>
        </nav>

        {/* Overlay for mobile menu */}
        {isMobile && isMenuOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={toggleMenu}></div>}
      </div>
    </header>
  )
}
