"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, File, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Import the PDF2MD library dynamically to avoid SSR issues
import dynamic from "next/dynamic"

// This component will only be loaded in the browser
const PDF2MDLoader = dynamic(() => import("@/components/pdf2md-loader"), { ssr: false })

interface FileUploaderProps {
  onConversionComplete: (markdown: string, file: File) => void
  isConverting: boolean
  setIsConverting: (isConverting: boolean) => void
}

export function FileUploader({ onConversionComplete, isConverting, setIsConverting }: FileUploaderProps) {
  const { t } = useTranslation()
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pdf2mdLoaded, setPdf2mdLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset progress when starting a new conversion
  useEffect(() => {
    if (isConverting) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Simulate progress up to 90% (the last 10% will be set when conversion completes)
          if (prev < 90) {
            return prev + 1
          }
          return prev
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isConverting])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        handleFile(file)
      } else {
        setError(t('supportedFormats'))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        handleFile(file)
      } else {
        setError(t('supportedFormats'))
      }
    }
  }

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError(t('maxFileSize'))
      return
    }

    setSelectedFile(file)
  }

  const handleConvert = async () => {
    if (!selectedFile || !pdf2mdLoaded) return

    setIsConverting(true)
    setError(null)

    try {
      // The actual conversion will be handled by the PDF2MDLoader component
      // This is just a placeholder for the button click handler
    } catch (error) {
      console.error("Error converting PDF:", error)
      setError("Failed to convert PDF. Please try a different file.")
      setIsConverting(false)
    }
  }

  return (
    <>
      {/* Hidden PDF2MD loader component that handles the actual conversion */}
      <PDF2MDLoader
        file={selectedFile}
        isConverting={isConverting}
        onLoad={() => setPdf2mdLoaded(true)}
        onConversionComplete={(markdown) => {
          if (selectedFile) {
            setProgress(100)
            onConversionComplete(markdown, selectedFile)
            setIsConverting(false)
          }
        }}
        onError={(errorMsg) => {
          setError(errorMsg)
          setIsConverting(false)
        }}
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card
        className={`border-2 ${
          dragActive ? "border-primary border-dashed bg-primary/5" : "border-dashed"
        } p-8 text-center`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="bg-muted rounded-full p-3">
            <Upload className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1">{t('uploadPDF')}</h3>
            <p className="text-sm text-muted-foreground mb-2">{t('dragAndDrop')} {t('orClickToSelect')}</p>

            {selectedFile && (
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                <File className="h-4 w-4" />
                {selectedFile.name}
              </div>
            )}
          </div>

          {isConverting ? (
            <div className="w-full max-w-xs">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">{t('converting')} {progress}%</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => inputRef.current?.click()} disabled={isConverting}>
                {t('selectFile')}
              </Button>

              {selectedFile && pdf2mdLoaded && (
                <Button onClick={handleConvert} disabled={isConverting}>
                  {t('convertNow')}
                </Button>
              )}
            </div>
          )}

          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleChange} />
        </div>
      </Card>
    </>
  )
}
