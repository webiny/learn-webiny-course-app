import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, AlertCircle } from "lucide-react"
import { MDXFrontmatter } from "@/lib/mdx-loader"

interface LessonMetadataProps {
  frontmatter: MDXFrontmatter
}

/**
 * Component to display lesson metadata from frontmatter
 * Usage: <LessonMetadata frontmatter={frontmatter} />
 */
export function LessonMetadata({ frontmatter }: LessonMetadataProps) {
  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return null
  }

  return (
    <div className="border rounded-lg p-4 mb-6 bg-muted/50">
      <div className="flex flex-wrap gap-4 text-sm">
        {/* Author */}
        {frontmatter.author && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{frontmatter.author}</span>
          </div>
        )}

        {/* Date */}
        {frontmatter.date && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{frontmatter.date}</span>
          </div>
        )}

        {/* Estimated Time */}
        {frontmatter.estimatedTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{frontmatter.estimatedTime}</span>
          </div>
        )}

        {/* Difficulty */}
        {frontmatter.difficulty && (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <Badge
              variant={
                frontmatter.difficulty === "advanced"
                  ? "destructive"
                  : frontmatter.difficulty === "intermediate"
                  ? "default"
                  : "secondary"
              }
            >
              {frontmatter.difficulty}
            </Badge>
          </div>
        )}
      </div>

      {/* Description */}
      {frontmatter.description && (
        <p className="mt-3 text-sm text-muted-foreground">
          {frontmatter.description}
        </p>
      )}

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Prerequisites */}
      {frontmatter.prerequisites && frontmatter.prerequisites.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm font-medium mb-2">Prerequisites:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {frontmatter.prerequisites.map((prereq: string) => (
              <li key={prereq}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

