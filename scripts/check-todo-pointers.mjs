#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LESSONS_DIR = path.join(__dirname, '..', 'content', 'lessons')

/**
 * Recursively find all MDX files in a directory
 */
function findMDXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findMDXFiles(filePath, fileList)
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * Check if a file contains TodoPointer component
 */
function checkForTodoPointers(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const todos = []

  lines.forEach((line, index) => {
    if (line.includes('<TodoPointer')) {
      // Try to extract title from the component
      const titleMatch = line.match(/title=["']([^"']+)["']/)
      const title = titleMatch ? titleMatch[1] : 'Untitled'

      todos.push({
        line: index + 1,
        title,
        content: line.trim()
      })
    }
  })

  return todos
}

/**
 * Main function to check all MDX files
 */
function main() {
  console.log('🔍 Checking for TodoPointer components in MDX files...\n')

  const mdxFiles = findMDXFiles(LESSONS_DIR)
  const filesWithTodos = []

  mdxFiles.forEach((filePath) => {
    const todos = checkForTodoPointers(filePath)

    if (todos.length > 0) {
      filesWithTodos.push({
        path: filePath,
        relativePath: path.relative(process.cwd(), filePath),
        todos
      })
    }
  })

  if (filesWithTodos.length === 0) {
    console.log('✅ No TodoPointer components found. All lessons are production-ready!\n')
    process.exit(0)
  }

  // Print findings
  console.log(`⚠️  Found ${filesWithTodos.length} file(s) with TodoPointer components:\n`)

  filesWithTodos.forEach((file, fileIndex) => {
    console.log(`${fileIndex + 1}. ${file.relativePath}`)
    file.todos.forEach((todo, todoIndex) => {
      console.log(`   ${todoIndex + 1}) Line ${todo.line}: "${todo.title}"`)
    })
    console.log('')
  })

  console.log('📝 Summary:')
  console.log(`   - Files with TODOs: ${filesWithTodos.length}`)
  console.log(`   - Total TODOs: ${filesWithTodos.reduce((sum, file) => sum + file.todos.length, 0)}`)
  console.log('\n⚠️  Please review and remove TodoPointer components before deploying to production.\n')

  // Show warnings but don't block the build
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️  Warning: TodoPointer components found in lessons. These should be removed before production deployment.\n')
  } else {
    console.log('💡 Tip: Run this check during development to track TODOs.\n')
  }

  // Exit with success code (0) to allow build to continue
  process.exit(0)
}

main()

