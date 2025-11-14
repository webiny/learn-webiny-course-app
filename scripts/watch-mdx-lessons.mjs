#!/usr/bin/env node

/**
 * File watcher that automatically regenerates the MDX registry
 * when lessons are added, removed, or renamed
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const lessonsDir = path.join(projectRoot, 'content', 'lessons')

console.log('👀 Watching for lesson changes...')
console.log(`📁 Directory: ${lessonsDir}\n`)

let isRegenerating = false
let regenerationQueued = false

async function regenerateRegistry() {
  if (isRegenerating) {
    regenerationQueued = true
    return
  }

  isRegenerating = true

  try {
    console.log('🔄 Regenerating MDX registry and course data...')

    // Regenerate MDX registry
    await execAsync('node scripts/generate-mdx-registry.mjs', { cwd: projectRoot })

    // Regenerate course data
    await execAsync('node scripts/generate-course-data.mjs', { cwd: projectRoot })

    console.log('✅ Registry and course data updated!\n')
  } catch (error) {
    console.error('❌ Failed to regenerate:', error.message)
  } finally {
    isRegenerating = false

    // If another change happened while we were regenerating, do it again
    if (regenerationQueued) {
      regenerationQueued = false
      setTimeout(() => regenerateRegistry(), 100)
    }
  }
}

// Watch all chapter directories
function watchDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`)
    return
  }

  try {
    fs.watch(dir, { recursive: false }, async (eventType, filename) => {
      if (filename && filename.endsWith('.mdx')) {
        console.log(`📝 Detected change: ${filename}`)
        await regenerateRegistry()
      }
    })
    console.log(`✓ Watching: ${path.basename(dir)}/`)
  } catch (error) {
    console.error(`Failed to watch ${dir}:`, error.message)
  }
}

// Watch the main lessons directory for new chapter folders
function watchLessonsDirectory() {
  if (!fs.existsSync(lessonsDir)) {
    console.error(`❌ Lessons directory not found: ${lessonsDir}`)
    process.exit(1)
  }

  // Watch main lessons directory for new chapter folders
  fs.watch(lessonsDir, { recursive: false }, async (eventType, filename) => {
    if (filename && !filename.startsWith('.')) {
      const fullPath = path.join(lessonsDir, filename)
      try {
        const stats = fs.statSync(fullPath)
        if (stats.isDirectory()) {
          console.log(`📁 New chapter detected: ${filename}`)
          watchDirectory(fullPath)
          await regenerateRegistry()
        }
      } catch (error) {
        // File might have been deleted, trigger regeneration
        if (error.code === 'ENOENT') {
          console.log(`🗑️  Directory removed: ${filename}`)
          await regenerateRegistry()
        }
      }
    }
  })

  console.log(`✓ Watching: lessons/ (for new chapters)\n`)
}

// Initial setup: watch all existing chapter directories
function setupWatchers() {
  try {
    const chapters = fs.readdirSync(lessonsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))

    chapters.forEach(chapter => {
      const chapterPath = path.join(lessonsDir, chapter.name)
      watchDirectory(chapterPath)
    })

    watchLessonsDirectory()

    console.log('🎉 File watcher is ready!')
    console.log('💡 Add, remove, or modify .mdx files and the registry will auto-update\n')
  } catch (error) {
    console.error('❌ Failed to setup watchers:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping file watcher...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n\n👋 Stopping file watcher...')
  process.exit(0)
})

// Start watching
setupWatchers()

