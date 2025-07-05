"use client"

import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import PetCarousel from "@/components/pet-carousel"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import LiveRedemptionZone from "@/components/live-redemption-zone"
import ComparisonSection from "@/components/comparison-section"
import Faq from "@/components/faq"
import Footer from "@/components/footer"
import RobloxModal from "@/components/roblox-modal"
import MemeSection from "@/components/meme-section"
import ScarcitySection from "@/components/scarcity-section"

// Updated real Roblox usernames from your new list
const realRobloxUsernames = [
  "SillyKatanaCyber77",
  "FlapjackFighterXPro",
  "BakerSillyChefX",
  "BerryBounceBaeZ",
  "StarSuchaPp99",
  "KeyboardTurtleX",
  "RubberDuckDynastyXX",
  "GalacticaGn0mePro",
  "MonsterSpaghetti42",
  "CheesePiratePizzaX",
  "UnicornFartsXPro",
  "InvisCatNinjaX9",
  "LaughingJokes88",
  "DinoDancingX1",
  "QuantumBreak9X",
  "XRainbowMuffinX",
  "FortKingFighterXL",
  "RocketPalRainb0wX",
  "SpySharkDoo007",
  "PrincessPineX1",
  "MasqueradeMusterX3",
  "SockSquadSnookX",
  "SquadGoneShell77",
  "ScouterX9Supremo",
  "FreakyHamHoly33",
  "NoobDonX1Dummy",
  "WitchM8ProX",
  "BonesHombre77Noob",
  "BatsX9M8Man",
  "OwlXxxX24",
  "SynthLunaX",
  "EchoVap0r99",
  "CyberDream39",
  "XQTDMysterious",
  "BaddieGalactic01",
  "PsycheDawgX7",
  "FolkloreFighter88",
  "FlightToxOwlX",
  "Creept0CrewX5",
  "GroovyGrandpapiX",
  "LilithDiabloGuavaX",
  "FervorDoomMr13",
  "SentySynthSmokyX",
  "WardenShoot99Senora",
  "DevilBaconStrangeX",
  "AmazonianRipper7",
  "ShadowGawdX3",
  "WavierWarriorsX9",
  "WaveEchoProRo",
  "Buch3rM3NAli3NWhoDat",
  "NotNoob",
  "BreadPitt",
  "DulaPeep",
  "issa_knife",
  "yalikejazz?",
  "DoodleBob",
  "ripharambe",
  "evil_seagull",
  "IYELLALOT",
  "itsamemario",
  "fee!fi!fo!fum!",
  "2fast2furious",
  "u_get_a_car!",
  "staph_it_rahn",
  "i_am_mclovin",
  "shrek_is_love",
  "nothisispatrick",
  "AnitaMaxWynn",
  "rip-(your name)",
  "get_out_mi_car",
  "prettyxboyxswag",
  "Shaquille_Oatmeal",
  "unfinished_sentenc",
  "young_grasshopper",
  "istageanintervention",
  "arianagrandesponytail",
  "spongebobsweatpants",
]

export default function HomePage() {
  const [playerCount, setPlayerCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const bgMusicRef = useRef<HTMLAudioElement | null>(null)
  const targetCount = 5000
  const countRef = useRef(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize audio elements
    clickSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3")
    bgMusicRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-happy-times-158.mp3")

    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true
      bgMusicRef.current.volume = 0.3
    }

    // Create dragonfly background elements
    const container = document.querySelector("body")
    if (container) {
      const positions = [
        { top: "10%", left: "5%", delay: "0s" },
        { top: "30%", left: "80%", delay: "3s" },
        { top: "70%", left: "15%", delay: "6s" },
      ]

      positions.forEach((pos) => {
        const dragonfly = document.createElement("div")
        dragonfly.className = "dragonfly-bg"
        dragonfly.style.top = pos.top
        dragonfly.style.left = pos.left
        dragonfly.style.animationDelay = pos.delay
        container.appendChild(dragonfly)
      })
    }

    // Add click event listener to play background music
    const handleClick = () => {
      if (bgMusicRef.current && !bgMusicRef.current.paused) return
      bgMusicRef.current?.play().catch((e) => console.log("Music play failed:", e))
      document.removeEventListener("click", handleClick)
    }
    document.addEventListener("click", handleClick)

    // Setup intersection observer for player counter
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounterAnimation()
        observer.disconnect()
      }
    })

    const playerCountElement = document.getElementById("player-count")
    if (playerCountElement) {
      observer.observe(playerCountElement)
    }

    return () => {
      document.removeEventListener("click", handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      // Remove dragonfly elements
      document.querySelectorAll(".dragonfly-bg").forEach((el) => el.remove())
    }
  }, [])

  const startCounterAnimation = () => {
    const duration = 3000 // 3 seconds
    const increment = targetCount / (duration / 16)
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime

      if (elapsed < duration) {
        countRef.current += increment
        setPlayerCount(Math.floor(countRef.current))
        animationRef.current = requestAnimationFrame(updateCounter)
      } else {
        setPlayerCount(targetCount)
      }
    }

    animationRef.current = requestAnimationFrame(updateCounter)
  }

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleCtaClick = () => {
    playClickSound()
    setShowModal(true)
  }

  return (
    <main className="min-h-screen">
      <Header onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-16 text-center relative" id="items">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
          Get <span className="free-text">FREE</span> Grow a Garden Pets! ✨
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 relative z-10">
          Collect rare Grow a Garden pets by completing easy tasks! No Robux needed.
        </p>

        <PetCarousel />

        <button
          className="cta-button-glow mt-8"
          onClick={() => {
            playClickSound()
            document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
          }}
          onMouseEnter={playClickSound}
        >
          Get Your Free Item Now
        </button>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="bg-white/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
            ⚡ Instant delivery
          </div>
          <div className="bg-white/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
            💰 100% free
          </div>
          <div className="bg-white/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
            👥 Trusted by{" "}
            <span className="text-[var(--forest-green)] font-bold" id="player-count">
              {playerCount.toLocaleString()}
            </span>{" "}
            players
          </div>
        </div>
      </section>

      <MemeSection onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <HowItWorks />

      <LiveRedemptionZone onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <Testimonials onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <ComparisonSection onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <ScarcitySection onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <Faq onCtaClick={handleCtaClick} playClickSound={playClickSound} />

      <Footer />

      {showModal && <RobloxModal onClose={() => setShowModal(false)} />}
    </main>
  )
}
