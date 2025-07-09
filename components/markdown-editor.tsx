"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownPreview } from "@/components/markdown-preview"
import { FileText, Code, Save, X, Download } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MarkdownEditorProps {
  isOpen: boolean
  onClose: () => void
  initialMarkdown: string
  onSave: (markdown: string) => void
  fileName?: string
}

export function MarkdownEditor({
  isOpen,
  onClose,
  initialMarkdown,
  onSave,
  fileName
}: MarkdownEditorProps) {
  const { t } = useTranslation()
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const [activeTab, setActiveTab] = useState("edit")

  const handleSave = () => {
    onSave(markdown)
    onClose()
  }

  const handleCancel = () => {
    setMarkdown(initialMarkdown) // Reset to original
    onClose()
  }

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a")
    const file = new Blob([markdown], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = (fileName?.replace(/\.pdf$/i, "") || "document") + ".md"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadWord = () => {
    // Create a temporary container to render the markdown with proper styling
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.left = '-9999px'
    tempContainer.style.top = '-9999px'
    tempContainer.style.width = '210mm' // A4 width
    tempContainer.style.padding = '25.4mm' // A4 margins
    tempContainer.style.backgroundColor = 'white'
    tempContainer.style.fontFamily = 'Calibri, Arial, sans-serif'
    tempContainer.style.fontSize = '11pt'
    tempContainer.style.lineHeight = '1.5'
    tempContainer.style.color = '#000000'
    
    // Add Tailwind prose styles manually
    tempContainer.innerHTML = `
      <style>
        .prose { max-width: none; }
        .prose h1 { font-size: 18pt; font-weight: bold; color: #1f4e79; margin: 24pt 0 12pt 0; line-height: 1.3; }
        .prose h2 { font-size: 14pt; font-weight: bold; color: #2f5597; margin: 18pt 0 6pt 0; line-height: 1.3; }
        .prose h3 { font-size: 12pt; font-weight: bold; color: #1f4e79; margin: 12pt 0 6pt 0; line-height: 1.3; }
        .prose h4, .prose h5, .prose h6 { font-size: 11pt; font-weight: bold; color: #1f4e79; margin: 12pt 0 3pt 0; line-height: 1.3; }
        .prose p { margin: 0 0 6pt 0; text-align: justify; }
        .prose ul, .prose ol { margin: 6pt 0; padding-left: 18pt; }
        .prose li { margin-bottom: 3pt; }
        .prose code { font-family: Consolas, 'Courier New', monospace; font-size: 10pt; background-color: #f2f2f2; padding: 1pt 3pt; border-radius: 2pt; border: 1pt solid #d4d4d4; }
        .prose pre { font-family: Consolas, 'Courier New', monospace; font-size: 9pt; background-color: #f8f8f8; border: 1pt solid #d4d4d4; border-radius: 3pt; padding: 12pt; margin: 12pt 0; overflow-x: auto; line-height: 1.4; }
        .prose pre code { background: none; border: none; padding: 0; font-size: inherit; }
        .prose table { border-collapse: collapse; width: 100%; margin: 12pt 0; font-size: 10pt; }
        .prose th, .prose td { border: 1pt solid #d4d4d4; padding: 6pt 8pt; text-align: left; vertical-align: top; }
        .prose th { background-color: #f2f2f2; font-weight: bold; }
        .prose a { color: #0563c1; text-decoration: underline; }
        .prose strong { font-weight: bold; }
        .prose em { font-style: italic; }
        .prose blockquote { margin: 12pt 0; padding: 6pt 12pt; border-left: 3pt solid #d4d4d4; background-color: #f9f9f9; font-style: italic; }
        .prose img { max-width: 100%; height: auto; margin: 6pt 0; }
        .prose hr { border: none; border-top: 1pt solid #d4d4d4; margin: 18pt 0; }
      </style>
      <div class="prose"></div>
    `
    
    const proseContainer = tempContainer.querySelector('.prose')
    document.body.appendChild(tempContainer)

    // Import ReactMarkdown and render
    import('react-markdown').then(({ default: ReactMarkdown }) => {
      import('remark-gfm').then(({ default: remarkGfm }) => {
        import('react-dom/client').then(({ createRoot }) => {
          const root = createRoot(proseContainer!)
          
          // Render the markdown using the exact same configuration as MarkdownPreview
          root.render(
            React.createElement(ReactMarkdown, {
              remarkPlugins: [remarkGfm],
              components: {
                pre: ({ node, ...props }) => React.createElement('pre', {
                  ...props,
                  className: 'overflow-x-auto p-4 bg-muted rounded-md my-4 text-sm [overflow-wrap:anywhere]'
                }),
                code: ({ node, inline, ...props }: any) => React.createElement('code', {
                  ...props,
                  className: inline
                    ? 'bg-muted px-1 py-0.5 rounded break-words text-sm'
                    : 'block overflow-x-auto [overflow-wrap:anywhere] text-sm'
                }),
                table: ({ children }) => React.createElement('div', {
                  className: 'my-4 overflow-x-auto'
                }, React.createElement('table', {
                  className: 'min-w-full border-collapse border border-gray-300 table-auto'
                }, children)),
                img: ({ src, alt }) => React.createElement('div', {
                  className: 'overflow-hidden'
                }, React.createElement('img', {
                  src: src || '/placeholder.svg',
                  alt: alt,
                  className: 'max-w-full h-auto'
                })),
                p: ({ children }) => React.createElement('p', {
                  className: 'whitespace-pre-wrap break-words [overflow-wrap:anywhere]'
                }, children),
                a: ({ node, href, children }) => React.createElement('a', {
                  href: href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'break-words [overflow-wrap:anywhere]'
                }, children)
              }
            }, markdown)
          )
          
          // Wait for rendering to complete, then extract HTML
          setTimeout(() => {
            const htmlContent = proseContainer!.innerHTML
            
            // Clean up the temporary container
            document.body.removeChild(tempContainer)
             
             const wordDocument = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${fileName?.replace(/\.pdf$/i, "") || "Document"}</title>
  <style>
    @page {
      size: A4;
      margin: 2.54cm;
    }
    
    * {
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      background: white;
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
    }
    
    body {
      max-width: 210mm;
      margin: 0 auto;
      padding: 25.4mm;
      background: white;
      min-height: 100vh;
    }
    
    /* Typography */
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 32px 0 16px 0;
      line-height: 1.2;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
    }
    
    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #334155;
      margin: 24px 0 12px 0;
      line-height: 1.3;
    }
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #475569;
      margin: 20px 0 10px 0;
      line-height: 1.3;
    }
    
    h4, h5, h6 {
      font-size: 16px;
      font-weight: 600;
      color: #64748b;
      margin: 16px 0 8px 0;
      line-height: 1.3;
    }
    
    p {
      margin: 0 0 16px 0;
      line-height: 1.6;
      text-align: justify;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    /* Lists */
    ul, ol {
      margin: 16px 0;
      padding-left: 24px;
      line-height: 1.6;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    /* Code */
    code {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 10pt;
      background-color: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      word-break: break-all;
    }
    
    pre {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 10pt;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      margin: 16px 0;
      overflow-x: auto;
      line-height: 1.5;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    pre code {
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
      word-break: normal;
    }
    
    /* Tables */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
      font-size: 10pt;
    }
    
    th, td {
      border: 1px solid #d1d5db;
      padding: 8px 12px;
      text-align: left;
      vertical-align: top;
      word-wrap: break-word;
    }
    
    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
    }
    
    /* Links */
    a {
      color: #2563eb;
      text-decoration: underline;
      word-break: break-all;
    }
    
    /* Text formatting */
    strong {
      font-weight: 700;
    }
    
    em {
      font-style: italic;
    }
    
    /* Blockquotes */
    blockquote {
      margin: 16px 0;
      padding: 12px 16px;
      border-left: 4px solid #d1d5db;
      background-color: #f9fafb;
      font-style: italic;
      color: #6b7280;
    }
    
    /* Images */
    img {
      max-width: 100%;
      height: auto;
      margin: 16px 0;
      border-radius: 4px;
    }
    
    /* Horizontal rules */
    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
    }
    
    @media print {
      body {
        padding: 0;
        margin: 0;
      }
      
      @page {
        margin: 2.54cm;
      }
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`
              
              const element = document.createElement("a")
              const file = new Blob([wordDocument], { type: "application/msword" })
              element.href = URL.createObjectURL(file)
              element.download = (fileName?.replace(/\.pdf$/i, "") || "document") + ".doc"
              document.body.appendChild(element)
              element.click()
              document.body.removeChild(element)
            }, 100)
          })
        })
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[900px] w-[90vw] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {t('editMarkdown') || '编辑 Markdown'}
            {fileName && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({fileName.replace(/\.pdf$/i, '')}.md)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                {t('edit') || '编辑'}
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('preview') || '预览'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="flex-1 mt-4">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder={t('editMarkdownPlaceholder') || '在此编辑您的 Markdown 内容...'}
                className="min-h-[600px] font-mono text-sm resize-none"
              />
            </TabsContent>
            
            <TabsContent value="preview" className="flex-1 mt-4">
              <ScrollArea className="h-[600px] w-full border rounded-md">
                <div className="p-4">
                  <MarkdownPreview markdown={markdown} />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              {t('cancel') || '取消'}
            </Button>
            <Button variant="outline" onClick={handleDownloadMarkdown}>
              <Download className="mr-2 h-4 w-4" />
              {t('downloadMd') || '下载 MD'}
            </Button>
            <Button variant="outline" onClick={handleDownloadWord}>
              <Download className="mr-2 h-4 w-4" />
              {t('downloadWord') || '下载 Word'}
            </Button>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            {t('saveChanges') || '保存更改'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}