"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface TestimonialsProps {
  onCtaClick: () => void
  playClickSound: () => void
}

interface Testimonial {
  username: string
  message: string
  timeAgo: string
  avatarUrl: string
}

// Real Roblox usernames with avatars from your list
const realRobloxUsers = [
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

const testimonialMessages = [
  "I got my golden raccoon in just 5 minutes! This site is amazing!",
  "Finally got the dragonfly I wanted without spending Robux. So happy!",
  "The red fox is so cute! Thanks for making this possible without Robux!",
  "omg this actually works! got my pet so fast 😘",
  "best site ever! got my raccoon for free, rizzler vibes only!",
  "no way this is real but it worked! got my owl by downloading 3 apps",
  "finally a legit site that actually gives pets, no cap fr fr",
  "my friends are so jealous of my new dragonfly 💀",
  "took me 2 minutes to get my fox, this is bussin!",
  "this is better than spending robux honestly, W site",
]

export default function Testimonials({ onCtaClick, playClickSound }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Generate random testimonials using real Roblox users
    const generateTestimonials = () => {
      const newTestimonials: Testimonial[] = []
      for (let i = 0; i < 3; i++) {
        const user = realRobloxUsers[Math.floor(Math.random() * realRobloxUsers.length)]
        const message = testimonialMessages[Math.floor(Math.random() * testimonialMessages.length)]
        const timeAgo = `${Math.floor(Math.random() * 7) + 1} days ago`

        newTestimonials.push({
          username: user.username,
          message,
          timeAgo,
          avatarUrl: user.avatar,
        })
      }
      return newTestimonials
    }

    setTestimonials(generateTestimonials())

    // Refresh testimonials every 30 seconds
    const interval = setInterval(() => {
      setTestimonials(generateTestimonials())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-[var(--soft-beige)]" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--forest-green)]">
          What Players Say
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatarUrl || "/placeholder.svg"}
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-bold">{testimonial.username}</div>
                  <div className="flex items-center text-sm text-blue-500">
                    <span className="mr-1">Verified Pet Collector</span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="italic mb-3">"{testimonial.message}"</p>
              <div className="flex items-center text-gray-500 text-sm">
                <span>⭐⭐⭐⭐⭐</span>
                <span className="ml-2">{testimonial.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[var(--forest-green)]">💀 DUDE. FREE PETS. WHY U WAITING?</h3>
          <button className="cta-button-bounce" onClick={onCtaClick} onMouseEnter={playClickSound}>
            Claim my pet
          </button>
        </div>
      </div>
    </section>
  )
}
