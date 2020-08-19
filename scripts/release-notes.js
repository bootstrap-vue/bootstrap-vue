const execa = require('execa')
const fs = require('fs').promises
const groupBy = require('lodash/groupBy')
const path = require('path')
const sortBy = require('lodash/sortBy')
const uniq = require('lodash/uniq')

const baseDir = path.resolve(__dirname, '..')
const pkg = require(path.resolve(baseDir, 'package.json'))

// --- Constants ---

const FILE_NAME = 'RELEASE-NOTES.md'

const TYPES = {
  feat: { title: '🚀 Features' },
  fix: { title: '🐛 Bug Fixes' },
  perf: { title: '🔥 Performance' },
  refactor: { title: '💅 Refactors' },
  chore: { title: '🏡 Chore' },
  test: { title: '👓 Tests' },
  types: { title: '🇹 Types' }
}

const ALLOWED_TYPES = Object.keys(TYPES)

const IGNORE_SCOPES = ['deps', 'deps-dev']

const KNOWN_AUTHORS = pkg.contributors.map(c => c.name.toLowerCase())

// --- Helper methods ---

const execCommand = (cmd, args) => execa(cmd, args).then(r => r.stdout)

const isKnownAuthor = name => !!KNOWN_AUTHORS.find(author => name.toLowerCase().includes(author))

const getLastGitTag = () => execCommand('git', ['describe', '--tags', '--abbrev=0'])
const getCurrentGitBranch = () => execCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD'])

// https://git-scm.com/docs/pretty-formats
const getGitDiff = async (from, to) => {
  const result = await execCommand('git', [
    '--no-pager',
    'log',
    `${from}...${to}`,
    '--pretty=%s|%h|%an|%ae'
  ])
  return result.split('\n').map(line => {
    const [message, commit, authorName, authorEmail] = line.split('|')
    return { message, commit, authorName, authorEmail }
  })
}

const parseCommits = commits => {
  const referencesRegex = /#[0-9]+/g

  return commits.filter(c => c.message.includes(':')).map(commit => {
    let [type, ...message] = commit.message.split(':')
    message = message.join(':')

    // Extract references from message
    message = message.replace(/\((closes|fixes) #\d[^)]+\)/g, '')
    const references = []
    let referenceMatch
    while ((referenceMatch = referencesRegex.exec(message))) {
      references.push(referenceMatch[0])
    }

    // Remove references and normalize
    message = message
      .replace(referencesRegex, '')
      .replace(/\(\)/g, '')
      .trim()

    // Extract scope from type
    let scope = type.match(/\((.*)\)/)
    if (scope) {
      scope = scope[1]
    }
    if (!scope) {
      scope = 'general'
    }
    type = type.split('(')[0]

    return {
      ...commit,
      message,
      type,
      scope,
      references
    }
  })
}

const generateMarkDown = commits => {
  const typeGroups = groupBy(commits, 'type')
  const emptyLine = ''
  const lines = []

  for (const type of ALLOWED_TYPES) {
    // Get commits by type
    const commitsForType = typeGroups[type]

    // Early exit when we have no commits for the current group
    if (!commitsForType || commitsForType.length === 0) {
      continue
    }

    // Add type group title
    const { title } = TYPES[type]
    lines.push(emptyLine, `### ${title}`, emptyLine)

    // Group commits by scope and loop through them
    const scopeGroups = groupBy(commitsForType, 'scope')
    for (const scopeName in scopeGroups) {
      // Add type group title
      lines.push(`- \`${scopeName}\``)

      // Add commits
      for (const commit of scopeGroups[scopeName]) {
        lines.push(
          '  - ' +
            (commit.references.length > 0 ? commit.references.join(', ') : commit.commit) +
            ' ' +
            commit.message.replace(/^(.)/, v => v.toUpperCase())
        )
      }
    }

    // Add final empty line
    lines.push(emptyLine)
  }

  // Add authors
  const authors = sortBy(
    uniq(commits.map(commit => commit.authorName).filter(author => !isKnownAuthor(author)))
  )
  if (authors.length > 0) {
    lines.push(
      emptyLine,
      '### 💖 Thanks to',
      emptyLine,
      ...authors.map(author => `- ${author}`),
      emptyLine
    )
  }

  return lines.join('\n').trim()
}

// --- Main command ---

const main = async () => {
  // Get last git tag
  const lastGitTag = await getLastGitTag()

  // Get current branch
  const currentGitBranch = await getCurrentGitBranch()

  // Get all commits from last release to current branch
  let commits = await getGitDiff(currentGitBranch, lastGitTag)

  // Parse commits as conventional commits
  commits = parseCommits(commits)

  // Filter commits
  commits = commits.filter(c => ALLOWED_TYPES.includes(c.type) && !IGNORE_SCOPES.includes(c.scope))

  // Write markdown file
  await fs.writeFile(FILE_NAME, generateMarkDown(commits), 'utf-8')
}

main()
