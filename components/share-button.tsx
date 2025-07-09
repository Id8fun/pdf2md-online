"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Share2, Copy, Check } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ShareButtonProps {
  className?: string
}

export function ShareButton({ className }: ShareButtonProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'PDF2MD - Transform Your PDFs into Clean Markdown'
  const shareDescription = 'Instantly convert PDF documents to perfectly formatted Markdown. 100% browser-based conversion.'
  const shareImage = `${typeof window !== 'undefined' ? window.location.origin : ''}/logo.png`

  const shareLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: `https://www.instagram.com/`,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'X (Twitter)',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'bg-black'
    },
    {
      name: 'Discord',
      icon: '💬',
      url: `https://discord.com/channels/@me`,
      color: 'bg-indigo-600'
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'bg-blue-500'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'bg-blue-600'
    },
    {
      name: 'WeChat',
      icon: '💬',
      url: '#',
      color: 'bg-green-500'
    }
  ]

  const handleShare = async (platform: string, url: string) => {
    if (platform === 'WeChat') {
      // WeChat sharing requires QR code or copying link
      await copyToClipboard()
      return
    }
    
    if (platform === 'Instagram' || platform === 'Discord') {
      // These platforms don't support direct URL sharing, copy link instead
      await copyToClipboard()
      return
    }

    // Try native sharing first (mobile)
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: currentUrl
        })
        return
      } catch (err) {
        // Fall back to opening URL
      }
    }

    // Desktop or fallback: open in new window
    window.open(url, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: currentUrl
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className={`h-12 px-6 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105 ${className}`}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share PDF2MD</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Native Share Button (Mobile) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via System
            </Button>
          )}
          
          {/* Social Media Platforms */}
          <div className="grid grid-cols-2 gap-3">
            {shareLinks.map((platform) => (
              <Button
                key={platform.name}
                onClick={() => handleShare(platform.name, platform.url)}
                className={`h-12 text-white hover:opacity-90 transition-opacity ${platform.color}`}
              >
                <span className="mr-2 text-lg">{platform.icon}</span>
                {platform.name}
              </Button>
            ))}
          </div>
          
          {/* Copy Link */}
          <div className="border-t pt-4">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full h-12"
            >
              {copiedUrl ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}