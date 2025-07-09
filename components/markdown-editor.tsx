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
    // 直接使用简化的HTML结构，避免复杂的React渲染
    import('react-markdown').then(({ default: ReactMarkdown }) => {
      import('remark-gfm').then(({ default: remarkGfm }) => {
        // 创建临时容器来渲染markdown
        const tempDiv = document.createElement('div')
        tempDiv.style.position = 'absolute'
        tempDiv.style.left = '-9999px'
        tempDiv.style.visibility = 'hidden'
        document.body.appendChild(tempDiv)
        
        // 使用React渲染markdown
        import('react-dom/client').then(({ createRoot }) => {
          const root = createRoot(tempDiv)
          
          root.render(
            React.createElement(ReactMarkdown, {
              remarkPlugins: [remarkGfm],
              components: {
                // 简化组件，移除Tailwind类名
                pre: ({ children, ...props }) => React.createElement('pre', props, children),
                code: ({ children, inline, ...props }: any) => 
                  React.createElement('code', { ...props, 'data-inline': inline }, children),
                table: ({ children, ...props }) => React.createElement('table', props, children),
                img: ({ src, alt, ...props }) => React.createElement('img', { 
                  ...props, 
                  src: src || '/placeholder.svg', 
                  alt: alt 
                }),
                p: ({ children, ...props }) => React.createElement('p', props, children),
                a: ({ href, children, ...props }) => React.createElement('a', { 
                  ...props, 
                  href: href,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }, children)
              }
            }, markdown)
          )
          
          // 等待渲染完成后提取HTML
          setTimeout(() => {
            const renderedHTML = tempDiv.innerHTML
            
            // 清理临时元素
            document.body.removeChild(tempDiv)
            
            // 生成Word文档HTML
            const wordDocument = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName?.replace(/\.pdf$/i, "") || "Document"}</title>
  <style>
    /* 页面设置 */
    @page {
      size: A4;
      margin: 2.54cm;
    }
    
    /* 基础样式重置 */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* 文档容器 */
    html, body {
      font-family: 'Times New Roman', '宋体', serif;
      font-size: 12pt;
      line-height: 1.8;
      color: #333;
      background: white;
      margin: 0;
      padding: 0;
    }
    
    body {
      max-width: 21cm;
      margin: 0 auto;
      padding: 2.54cm;
      background: white;
    }
    
    /* 标题样式 - 清晰的层次结构 */
    h1 {
      font-size: 22pt;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      margin: 0 0 24pt 0;
      padding-bottom: 12pt;
      border-bottom: 2pt solid #333;
      line-height: 1.3;
    }
    
    h2 {
      font-size: 18pt;
      font-weight: bold;
      color: #2c3e50;
      margin: 24pt 0 12pt 0;
      padding-left: 0;
      line-height: 1.4;
    }
    
    h3 {
      font-size: 16pt;
      font-weight: bold;
      color: #34495e;
      margin: 18pt 0 9pt 0;
      padding-left: 12pt;
      line-height: 1.4;
    }
    
    h4 {
      font-size: 14pt;
      font-weight: bold;
      color: #5d6d7e;
      margin: 15pt 0 6pt 0;
      padding-left: 24pt;
      line-height: 1.4;
    }
    
    h5, h6 {
      font-size: 12pt;
      font-weight: bold;
      color: #7b8794;
      margin: 12pt 0 6pt 0;
      padding-left: 36pt;
      line-height: 1.4;
    }
    
    /* 段落样式 */
    p {
      margin: 0 0 12pt 0;
      text-align: justify;
      text-indent: 2em;
      line-height: 1.8;
      word-wrap: break-word;
    }
    
    /* 列表样式 */
    ul, ol {
      margin: 12pt 0 12pt 24pt;
      padding-left: 24pt;
      line-height: 1.8;
    }
    
    li {
      margin-bottom: 6pt;
      line-height: 1.8;
    }
    
    ul li {
      list-style-type: disc;
    }
    
    ol li {
      list-style-type: decimal;
    }
    
    /* 嵌套列表 */
    ul ul, ol ol, ul ol, ol ul {
      margin: 6pt 0 6pt 24pt;
    }
    
    /* 代码样式 */
    code[data-inline="true"] {
      font-family: 'Courier New', 'Consolas', monospace;
      font-size: 11pt;
      background-color: #f5f5f5;
      padding: 2pt 4pt;
      border: 1pt solid #ddd;
      border-radius: 3pt;
      color: #d14;
    }
    
    pre {
      font-family: 'Courier New', 'Consolas', monospace;
      font-size: 10pt;
      background-color: #f8f8f8;
      border: 1pt solid #ccc;
      border-radius: 4pt;
      padding: 12pt;
      margin: 12pt 0;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    pre code {
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
      color: inherit;
    }
    
    /* 表格样式 */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
      font-size: 11pt;
    }
    
    th, td {
      border: 1pt solid #333;
      padding: 8pt 12pt;
      text-align: left;
      vertical-align: top;
      word-wrap: break-word;
    }
    
    th {
      background-color: #f0f0f0;
      font-weight: bold;
      text-align: center;
    }
    
    /* 链接样式 */
    a {
      color: #0066cc;
      text-decoration: underline;
      word-break: break-all;
    }
    
    /* 文本格式 */
    strong, b {
      font-weight: bold;
    }
    
    em, i {
      font-style: italic;
    }
    
    /* 引用块 */
    blockquote {
      margin: 12pt 0 12pt 24pt;
      padding: 12pt 18pt;
      border-left: 4pt solid #ccc;
      background-color: #f9f9f9;
      font-style: italic;
      color: #666;
      line-height: 1.8;
    }
    
    /* 图片 */
    img {
      max-width: 100%;
      height: auto;
      margin: 12pt 0;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* 分隔线 */
    hr {
      border: none;
      border-top: 1pt solid #ccc;
      margin: 24pt 0;
    }
    
    /* 打印样式 */
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      
      @page {
        margin: 2.54cm;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }
      
      p, li {
        page-break-inside: avoid;
      }
      
      table {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
${renderedHTML}
</body>
</html>`
            
            // 下载文件
            const element = document.createElement("a")
            const file = new Blob([wordDocument], { type: "application/msword;charset=utf-8" })
            element.href = URL.createObjectURL(file)
            element.download = (fileName?.replace(/\.pdf$/i, "") || "document") + ".doc"
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
          }, 200)
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