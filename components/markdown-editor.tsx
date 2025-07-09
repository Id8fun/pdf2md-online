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
    // Create a temporary container to render the markdown
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.left = '-9999px'
    tempContainer.style.top = '-9999px'
    tempContainer.style.width = '800px'
    tempContainer.className = 'prose dark:prose-invert max-w-none break-words'
    document.body.appendChild(tempContainer)

    // Import ReactMarkdown and render
    import('react-markdown').then(({ default: ReactMarkdown }) => {
      import('remark-gfm').then(({ default: remarkGfm }) => {
        import('react-dom/client').then(({ createRoot }) => {
          const root = createRoot(tempContainer)
          
          // Render the markdown using the same configuration as MarkdownPreview
          root.render(
            React.createElement(ReactMarkdown, {
              remarkPlugins: [remarkGfm],
              components: {
                pre: ({ node, ...props }) => React.createElement('pre', {
                  ...props,
                  className: 'overflow-x-auto p-4 bg-gray-100 rounded-md my-4 text-sm'
                }),
                code: ({ node, inline, ...props }: any) => React.createElement('code', {
                   ...props,
                   className: inline ? 'bg-gray-100 px-1 py-0.5 rounded break-words text-sm' : 'block overflow-x-auto text-sm'
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
                  className: 'whitespace-pre-wrap break-words'
                }, children),
                a: ({ node, href, children }) => React.createElement('a', {
                  href: href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'break-words'
                }, children)
              }
            }, markdown)
          )
          
          // Wait for rendering to complete, then extract HTML
           setTimeout(() => {
             const htmlContent = tempContainer.innerHTML
             
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
      margin: 2.54cm 2.54cm 2.54cm 2.54cm;
    }
    
    * {
      box-sizing: border-box;
    }
    
    html {
      font-size: 12pt;
    }
    
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
      background: white;
      margin: 0;
      padding: 0;
      width: 21cm;
      min-height: 29.7cm;
      margin: 0 auto;
      background: white;
      box-shadow: none;
    }
    
    .page {
      width: 21cm;
      min-height: 29.7cm;
      padding: 2.54cm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      page-break-after: always;
    }
    
    h1 {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 18pt;
      font-weight: bold;
      color: #1f4e79;
      margin-top: 24pt;
      margin-bottom: 12pt;
      line-height: 1.3;
      page-break-after: avoid;
    }
    
    h2 {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 14pt;
      font-weight: bold;
      color: #2f5597;
      margin-top: 18pt;
      margin-bottom: 6pt;
      line-height: 1.3;
      page-break-after: avoid;
    }
    
    h3 {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 12pt;
      font-weight: bold;
      color: #1f4e79;
      margin-top: 12pt;
      margin-bottom: 6pt;
      line-height: 1.3;
      page-break-after: avoid;
    }
    
    h4, h5, h6 {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      font-weight: bold;
      color: #1f4e79;
      margin-top: 12pt;
      margin-bottom: 3pt;
      line-height: 1.3;
      page-break-after: avoid;
    }
    
    p {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      margin-top: 0;
      margin-bottom: 6pt;
      text-align: justify;
      orphans: 2;
      widows: 2;
    }
    
    ul, ol {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      margin-top: 6pt;
      margin-bottom: 6pt;
      padding-left: 18pt;
    }
    
    li {
      margin-bottom: 3pt;
      orphans: 2;
      widows: 2;
    }
    
    code {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 10pt;
      background-color: #f2f2f2;
      padding: 1pt 3pt;
      border-radius: 2pt;
      border: 1pt solid #d4d4d4;
    }
    
    pre {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 9pt;
      background-color: #f8f8f8;
      border: 1pt solid #d4d4d4;
      border-radius: 3pt;
      padding: 12pt;
      margin: 12pt 0;
      overflow-x: auto;
      line-height: 1.4;
      page-break-inside: avoid;
    }
    
    pre code {
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 12pt 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1pt solid #d4d4d4;
      padding: 6pt 8pt;
      text-align: left;
      vertical-align: top;
    }
    
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    
    a {
      color: #0563c1;
      text-decoration: underline;
    }
    
    strong {
      font-weight: bold;
    }
    
    em {
      font-style: italic;
    }
    
    blockquote {
      margin: 12pt 0;
      padding: 6pt 12pt;
      border-left: 3pt solid #d4d4d4;
      background-color: #f9f9f9;
      font-style: italic;
    }
    
    img {
      max-width: 100%;
      height: auto;
      margin: 6pt 0;
    }
    
    hr {
      border: none;
      border-top: 1pt solid #d4d4d4;
      margin: 18pt 0;
    }
    
    @media print {
      body {
        box-shadow: none;
      }
      
      .page {
        box-shadow: none;
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    ${htmlContent}
  </div>
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