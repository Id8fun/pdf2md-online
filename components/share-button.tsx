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
  
  const shareLinks = [
    {
      name: 'Instagram',
      url: `https://www.instagram.com/`
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Discord',
      url: `https://discord.com/channels/@me`
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'WeChat',
      url: '#'
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
    if (typeof navigator !== 'undefined' && navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
    if (typeof navigator !== 'undefined' && navigator.share) {
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
              className="w-full h-10 bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via System
            </Button>
          )}
          
          {/* Social Media Platforms */}
          <div className="grid grid-cols-1 gap-2">
            {shareLinks.map((platform) => (
              <Button
                key={platform.name}
                onClick={() => handleShare(platform.name, platform.url)}
                variant="outline"
                className="h-10 justify-start text-gray-700 hover:bg-gray-50"
              >
                {platform.name}
              </Button>
            ))}
          </div>
          
          {/* Copy Link */}
          <div className="border-t pt-4">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full h-10"
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