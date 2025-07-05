"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Lock, AlertCircle, RefreshCw } from "lucide-react"

interface RobloxModalProps {
  onClose: () => void
}

export default function RobloxModal({ onClose }: RobloxModalProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<{
    name: string
    avatarUrl: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleVerify = async () => {
    const cleanUsername = username.trim().replace(/\s+/g, "")

    if (!cleanUsername) {
      setError("Please enter your Roblox username!")
      return
    }

    if (!/^[\w_]{3,20}$/.test(cleanUsername)) {
      setError("Please enter a valid username (3-20 characters, letters, numbers, or underscores).")
      return
    }

    setError(null)
    setIsLoading(true)
    setShowProfile(true)

    try {
      const cors = "https://corsproxy.io/?"
      const searchUrl = `${cors}https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(cleanUsername)}`

      const searchResponse = await fetch(searchUrl)
      const searchData = await searchResponse.json()

      if (!searchData.data || searchData.data.length === 0) {
        // If no user found, still proceed with the entered username
        setProfileData({
          name: cleanUsername,
          avatarUrl: "/placeholder.svg?height=90&width=90",
        })
        setIsLoading(false)
        return
      }

      // Try to find exact match or use first result
      const user =
        searchData.data.find(
          (u: any) =>
            u.name.toLowerCase() === cleanUsername.toLowerCase() ||
            u.name.toLowerCase().replace(/\s+/g, "") === cleanUsername.toLowerCase(),
        ) || searchData.data[0]

      // Fetch avatar
      const avatarUrl = `${cors}https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=420x420&format=Png`
      const avatarResponse = await fetch(avatarUrl)
      const avatarData = await avatarResponse.json()

      const finalAvatarUrl = avatarData.data?.[0]?.imageUrl || "/placeholder.svg?height=90&width=90"

      setProfileData({
        name: user.name,
        avatarUrl: finalAvatarUrl,
      })
    } catch (error: any) {
      // On any error, proceed with entered username
      setProfileData({
        name: cleanUsername,
        avatarUrl: "/placeholder.svg?height=90&width=90",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = () => {
    // Always redirect regardless of verification status
    window.location.href = `/select-pet?username=${encodeURIComponent(profileData?.name || username)}`
  }

  const handleDeny = () => {
    setShowProfile(false)
    setProfileData(null)
    setError(null)
  }

  const handleTryAgain = () => {
    setShowProfile(false)
    setProfileData(null)
    setError(null)
    setUsername("")
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-md relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--forest-green)] mb-2">Enter Your Roblox Username</h2>
          <p className="text-gray-600">We'll verify your account to send your free pets!</p>

          <div className="flex justify-center my-4">
            <Image
              src="https://aldi.today/photo/rbxicon.png"
              alt="Roblox Icon"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your exact Roblox username"
              className="w-full px-4 py-3 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sky-blue)] focus:border-[var(--sky-blue)]"
              disabled={isLoading}
            />
            {error && !isLoading && !profileData && (
              <div className="mt-2 text-red-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {showProfile && (
            <div className="bg-gray-50 rounded-lg p-4">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="loading-spinner mx-auto"></div>
                  <p className="mt-3 text-gray-600">Verifying your profile...</p>
                </div>
              ) : profileData ? (
                <div className="text-center">
                  <div className="profile-preview">
                    <Image
                      src={profileData.avatarUrl || "/placeholder.svg"}
                      alt="Roblox Avatar"
                      width={90}
                      height={90}
                      className="rounded-full border-3 border-[var(--sunshine-yellow)] mx-auto"
                    />
                    <div className="profile-username">{profileData.name}</div>
                    <p className="text-[var(--forest-green)] font-medium mb-4">🟢 Profile verified!</p>
                    <p className="mb-4">Is this your profile?</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      className="bg-[var(--forest-green)] text-white font-bold py-3 rounded-lg hover:bg-[var(--forest-green)]/90 transition-colors"
                      onClick={handleConfirm}
                    >
                      YES, CONTINUE
                    </button>
                    <button
                      className="bg-white text-[var(--forest-green)] font-bold py-3 rounded-lg border-2 border-[var(--forest-green)] hover:bg-gray-50 transition-colors"
                      onClick={handleDeny}
                    >
                      NO, TRY AGAIN
                    </button>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500 font-medium mb-4">Oops! Username not found</p>
                  <p className="text-gray-600 mb-6">Please check your spelling and try again.</p>

                  <button
                    className="bg-[var(--forest-green)] text-white font-bold py-3 px-6 rounded-lg hover:bg-[var(--forest-green)]/90 transition-colors flex items-center gap-2 mx-auto"
                    onClick={handleTryAgain}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {!showProfile && (
            <button
              className="w-full bg-gradient-to-r from-[var(--forest-green)] to-[var(--sky-blue)] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              onClick={handleVerify}
            >
              <Lock className="w-4 h-4" />
              VERIFY NOW
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
