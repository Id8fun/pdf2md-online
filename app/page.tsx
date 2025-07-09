"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FileUploader } from "@/components/file-uploader"
import { MarkdownPreview } from "@/components/markdown-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Code, ArrowRight, Edit, Twitter, ArrowLeft, Github } from "lucide-react"
import { FaqSection } from "@/components/faq-section"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitHubStarButton } from "@/components/github-star-button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ShareButton } from "@/components/share-button"
import { MarkdownEditor } from "@/components/markdown-editor"
import "@/i18n/client"

export default function Home() {
  const { t } = useTranslation()
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Mouse follow effect for interactive bubble
    const interBubble = document.querySelector('.interactive')
    if (!interBubble) return
    
    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    function move() {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      ;(interBubble as HTMLElement).style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      requestAnimationFrame(move)
    }

    function handleMouseMove(event: MouseEvent) {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen relative">
      {/* Top Navigation */}
      <div className="container mx-auto px-4 max-w-4xl relative z-20">
        <div className="flex justify-between items-center pt-4">
          <a 
            href="https://id8.fun/application/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back</span>
          </a>
          {isClient && <LanguageSwitcher />}
        </div>
      </div>
      
      {/* Dynamic Gradient Background */}
      <div className="gradient-bg">
        <svg className="fixed top-0 left-0 w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
      
      <div className="container mx-auto py-16 px-4 max-w-4xl relative z-10">
        <div className="relative">
          
          {/* Header content */}
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {isClient ? t('browserBased') : '100% browser-based conversion'}
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-center text-white drop-shadow-lg mb-4 max-w-2xl">
                {isClient ? t('title') : 'Transform Your PDFs into Clean Markdown'}
              </h1>
              
              <p className="text-lg text-white/90 drop-shadow-md max-w-xl mb-8">
                {isClient ? t('description') : 'Instantly convert PDF documents to perfectly formatted Markdown. Your files never leave your device — everything happens right in your browser.'}
              </p>
              
              <div className="flex items-center gap-4">
                <Button 
                  className="h-12 px-6 text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    // Scroll to file uploader
                    document.querySelector('#file-uploader')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {isClient ? t('convertNow') : 'Convert PDF Now'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <ShareButton />
                <GitHubStarButton className="h-12" />
              </div>
            </div>
          </div>
          
          {/* Bottom accent line with gradient */}
          <div className="absolute -bottom-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        </div>

        <div className="grid gap-12 mt-24" id="file-uploader">
          <div className="transition-all duration-200 hover:scale-[1.01]">
            <FileUploader
              onConversionComplete={(result, file) => {
                setMarkdown(result)
                setFileName(file.name)
              }}
              isConverting={isConverting}
              setIsConverting={setIsConverting}
            />
          </div>

          {markdown && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow-lg">
                    {isClient ? t('conversionResult') : 'Conversion Result'}
                  </h2>
                  <p className="text-sm text-white/70 drop-shadow-md">
                    {fileName?.replace(/\.pdf$/i, '')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsEditorOpen(true)}
                    className="h-9 font-medium bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit className="mr-1.5 h-4 w-4" />
                    {isClient ? t('edit') : 'Edit'}
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(markdown || "")
                      alert(isClient ? t('copiedToClipboard') : "Markdown copied to clipboard!")
                    }}
                    className="h-9 font-medium bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {isClient ? t('copy') : 'Copy'}
                  </Button>
                  <Button
                    onClick={() => {
                      if (!markdown || !fileName) return

                      const element = document.createElement("a")
                      const file = new Blob([markdown], { type: "text/markdown" })
                      element.href = URL.createObjectURL(file)
                      element.download = fileName.replace(/\.pdf$/i, "") + ".md"
                      document.body.appendChild(element)
                      element.click()
                      document.body.removeChild(element)
                    }}
                    className="h-9 font-medium bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  >
                    <FileText className="mr-1.5 h-4 w-4" />
                    {isClient ? t('download') : 'Download'}
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="flex h-12 items-center gap-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <TabsTrigger 
                      value="preview" 
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
                    >
                      <FileText className="h-4 w-4" />
                      {isClient ? t('preview') : 'Preview'}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="markdown"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
                    >
                      <Code className="h-4 w-4" />
                      {isClient ? t('markdown') : 'Markdown'}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="p-6">
                    <div className="overflow-x-auto">
                      <div className="max-w-full">
                        <MarkdownPreview markdown={markdown} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="markdown">
                    <div className="relative">
                      <ScrollArea className="h-[600px] w-full">
                        <div className="p-6">
                          <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                            <code className="whitespace-pre-wrap [overflow-wrap:anywhere]">{markdown}</code>
                          </pre>
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-20">
          <FaqSection />
        </div>

        <footer className="mt-20 text-center text-sm text-white/80 drop-shadow-md">
          <p className="mb-6">
            I continue to build this project based on Michael Ryaboy's open source project, thanks for open source
          </p>
          <div className="flex justify-center items-center gap-4">
            <a 
              href="https://github.com/0xlauyu/pdf2md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              <span className="font-medium">GitHub</span>
            </a>
            <a 
              href="https://twitter.com/0xlauyu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
            >
              <Twitter className="h-4 w-4" />
              <span className="font-medium">@0xlauyu</span>
            </a>
          </div>
        </footer>
      </div>
      
      {/* Markdown Editor Modal */}
      {markdown && (
        <MarkdownEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          initialMarkdown={markdown}
          onSave={(editedMarkdown) => setMarkdown(editedMarkdown)}
          fileName={fileName || undefined}
        />
      )}
    </main>
  )
}

