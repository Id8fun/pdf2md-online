"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface GitHubStarButtonProps {
  repoUrl?: string
  className?: string
}

export function GitHubStarButton({
  repoUrl = "https://github.com/Id8fun/pdf2md-online",
  className,
}: GitHubStarButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white ${className}`}
      onClick={() => window.open(repoUrl, "_blank", "noopener,noreferrer")}
    >
      <Github className="h-4 w-4" />
      <span>Star on GitHub</span>
    </Button>
  )
}
