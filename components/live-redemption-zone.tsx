"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface RedemptionEntry {
  username: string
  pet: string
  petEmoji: string
  timeAgo: number // Changed to number for tick
  avatarUrl: string
}

interface LiveRedemptionZoneProps {
  onCtaClick: () => void
  playClickSound: () => void
}

// Replace the realRobloxUsernames array with:
const realRobloxUsernames = [
  {
    username: "Liliana_Cupcake1",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F886F6A2F04884003042CB1B133FF85E-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "PixelNinja123",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-DB22938CEDD6F835BDC83517F22CF558-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "ayoletgo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F323BBE8809396771A9D3B009ABB7B6C-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Dreamycloudxo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-877FD313CF49AC230D6CDB0813384418-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "lily_l0llyp0p",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-508B26B915327442310C15E05990262A-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "lilypaddd11",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D69F986644481AEE90D6BBB252BDD78B-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Sisi_7901",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-2C45A19E70B6AAC621EBD8B2D0A6E42E-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "him90236",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-06DD1C00CA0EB2CCDF1E8E828D182573-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Queenbee_mavi",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-7E66C8AA069C27FAB434F332DFA7DE40-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "reto21r",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-ED6E717A62E7C6DE57502AA232123D98-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Emmagirl0916",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A415CFB32D441BB6E1A96CA204BB0647-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "3mmqza",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A4BA51E32FA674ED3D7A1CE66FE5AA40-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "parassinitu",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D317B719D555BB05A2AF522B512BFF23-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "laxyaaa",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A7818BF2D5D4AC3CB6D5418A713BBB6C-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Battal_216",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-AEC10DD31BD85B9706BB3567ED5A4BC5-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "bangakumakan",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A9C2582009A1FDECCA18263C7A3C6FE8-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "DDDDEdZZ",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-0E08B78408BB5614B39A026D36A9575D-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Anhtomdepzai",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-6C9E0AAEF821128DD48FB8A389C4A0B9-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "XAGXcallYTCH",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-EA378FFC5001D147249CB2B3AAED2C05-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Moonee_Play",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-151FF93EEB183449A06A4833E71938A3-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "hotspot5671",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F47CC2E15DEC626448D15A9E66EF1762-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "CyberXIndo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A654D4AEA6E04F5671471E0266B4EA62-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "AT111114",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-E9527F1E31B8A775C70C0022AF80FDC5-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "wDetrox",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D149EA2C4E77B7B6882D6C056B0B3772-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Eightnesses",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-3F0C92CED81F2936EA712517457CC982-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "EightPxth",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-B6530B4FCD3302ED31F4BD913E198D7F-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Ishowspeedjr2nd",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-16067DDF7E67005B57C8CA1BACBC8395-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "angel1789tay",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-8EE17821CC0789141F9753763D593180-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "gardenwindut",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A8B021C60924EE61CEF929236824C30F-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "needscreativity",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-9C81A53E43F0D94E105F86CFCC350C5D-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Richy_544",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-7D7B193935907A3816671468E709A849-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
]

// Pet types with emojis
const pets = [
  { name: "Raccoon", emoji: "🦝" },
  { name: "Dragonfly", emoji: "🐉" },
  { name: "Red Fox", emoji: "🦊" },
  { name: "Owl", emoji: "🦉" },
]

// Generate random avatar URLs
const generateAvatarUrl = () => {
  const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const randomId = avatarIds[Math.floor(Math.random() * avatarIds.length)]
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomId}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

export default function LiveRedemptionZone({ onCtaClick, playClickSound }: LiveRedemptionZoneProps) {
  const [entries, setEntries] = useState<RedemptionEntry[]>([])
  const [queueCount, setQueueCount] = useState(7)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const tickRef = useRef<NodeJS.Timeout | null>(null)

  // Helper to avoid duplicate usernames/pets in a row
  function getUniqueRandom(array, prevValue) {
    let pick
    let tries = 0
    do {
      pick = array[Math.floor(Math.random() * array.length)]
      tries++
    } while ((pick.username === prevValue?.username || pick.name === prevValue?.pet) && tries < 10)
    return pick
  }

  // Generate a new entry, avoiding duplicates
  function generateEntry(prevEntry) {
    const user = getUniqueRandom(realRobloxUsernames, prevEntry)
    const pet = getUniqueRandom(pets, prevEntry)
    return {
      username: user.username,
      pet: pet.name,
      petEmoji: pet.emoji,
      timeAgo: 0, // seconds
      avatarUrl: user.avatar,
    }
  }

  // On mount, initialize entries with correct timeAgo
  useEffect(() => {
    const initialEntries = []
    let prev = null
    for (let i = 0; i < 4; i++) {
      const entry = generateEntry(prev)
      entry.timeAgo = i * 7 // 0, 7, 14, 21
      initialEntries.push(entry)
      prev = entry
    }
    setEntries(initialEntries)
  }, [])

  // Tick every second to update timeAgo
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setEntries((prev) => prev.map((e) => ({ ...e, timeAgo: e.timeAgo + 1 })))
    }, 1000)
    return () => clearInterval(tickRef.current!)
  }, [])

  // Every 7–12 seconds, add a new entry at the top
  useEffect(() => {
    function addNewEntry() {
      setEntries((prev) => {
        const newEntry = generateEntry(prev[0])
        // Shift all timeAgo up by 7 seconds
        const updated = [
          { ...newEntry, timeAgo: 0 },
          ...prev.slice(0, prev.length - 1).map((e) => ({ ...e, timeAgo: e.timeAgo + 7 })),
        ]
        return updated
      })
      setQueueCount((prev) => Math.max(3, Math.min(12, prev + Math.floor(Math.random() * 3) - 1)))
    }
    const randomDelay = () => 7000 + Math.random() * 5000
    let timeout = setTimeout(function loop() {
      addNewEntry()
      timeout = setTimeout(loop, randomDelay())
    }, randomDelay())
    intervalRef.current = timeout
    return () => clearTimeout(intervalRef.current!)
  }, [])

  // Format timeAgo for display
  function formatTimeAgo(sec) {
    if (sec < 1) return 'Just now'
    return `${sec} sec ago`
  }

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4">
        <div className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--sky-blue)] rounded-xl p-1">
          <div className="bg-white rounded-lg p-3 md:p-6">
            {/* Update the JSX to add blinking live indicator and improve mobile responsiveness: */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
              <div className="text-xl md:text-3xl font-bold text-[var(--forest-green)]">🟢 LIVE RIGHT NOW!</div>
              <div className="relative">
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                <span className="absolute top-1/2 -translate-y-1/2 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              </div>
            </div>

            <h2 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6">Players getting free pets!</h2>

            {/* Mobile-optimized table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <div className="min-w-full">
                {/* Desktop table view */}
                <div className="hidden md:block">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Player</th>
                        <th className="py-2 px-4 text-left">Pet Claimed</th>
                        <th className="py-2 px-4 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, index) => (
                        <tr key={index} className={`border-b ${index === 0 ? "animate-highlight" : ""}`}>
                          <td className="py-3 px-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                              <Image
                                src={entry.avatarUrl || "/placeholder.svg"}
                                alt="Avatar"
                                width={32}
                                height={32}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <span className="font-medium">{entry.username}</span>
                          </td>
                          <td className="py-3 px-4">
                            {entry.petEmoji} {entry.pet}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-500">{formatTimeAgo(entry.timeAgo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card view */}
                <div className="md:hidden space-y-3">
                  {entries.map((entry, index) => (
                    <div
                      key={index}
                      className={`bg-gray-50 rounded-lg p-3 ${index === 0 ? "animate-highlight border-2 border-green-200" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                            <Image
                              src={entry.avatarUrl || "/placeholder.svg"}
                              alt="Avatar"
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{entry.username}</div>
                            <div className="text-sm text-gray-600">
                              {entry.petEmoji} {entry.pet}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{formatTimeAgo(entry.timeAgo)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--forest-green)]">
                🚀 3 pets left! YOUR username could be next!
              </h3>
              <button
                className="cta-button-fire relative overflow-hidden group w-full md:w-auto"
                onClick={onCtaClick}
                onMouseEnter={playClickSound}
              >
                <span className="relative z-10 flex items-center justify-center">🔥 GET MINE NOW!</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <p className="mt-3 text-sm text-gray-500">{queueCount} players waiting...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
