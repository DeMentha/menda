const util = require('util')
const { exec: _exec, spawnSync } = require('child_process')
const exec = util.promisify(_exec)

/**
 * updateDeps.js
 *
 * This is a node script to update all outdated npm packages, creating a separate git commit for each
 * package so that git bisect can be used to identify any packages that cause problems.
 *
 * To use this script cd to a directory that contains a package.json file and execute it with node.
 *
 * @example
 *
 *     cd client && node ../bin/updateDeps.js
 */

/**
 * Split string by whitespace
 *
 * @param str
 * @returns {string[]}
 */
function splitByWhitespace (str) {
  return str.split(/\s+/)
}

/**
 * Zip two arrays together
 *
 * @param a
 * @param b
 * @returns {*}
 */
const zip = (a, b) => a.map((e, i) => [e, b[i]])

/**
 * Curry the zip function
 *
 * @param a
 * @returns {function(*=): *}
 */
const zipWith = a => b => zip(a, b)

/**
 * Convert the output of "npm outdated" to an array of objects with keys that
 * match the first line of the output (Package, Current, Wanted, Latest, Location)
 *
 * @param {Array} lines - stdout, split into lines
 */
function linesToObjects (lines) {
  let [header, ...rows] = lines.map(splitByWhitespace)
  return rows
    .filter(row => row.length === header.length) // remove empty lines
    .map(zipWith(header)) // create arrays of key, value tuples
    .map(row => new Map(row)) // convert arrays of tuples into Maps
}

/**
 * Parse stdout from "npm outdated"
 *
 * @param stdout
 */
function parse (stdout) {
  const lines = stdout.split('\n')
  return linesToObjects(lines)
}

/**
 * Execute "npm update" for a given package
 *
 * @param {string} pkg - name of package to update
 * @returns {void}
 */
function updatePackage (pkg) {
  console.log(`npm up ${pkg}`)
  spawnSync('npm', ['up', pkg], { stdio: 'inherit' })
}

/**
 * Create a git commit with package.json and package-lock.json changes
 *
 * @param {string} name - Package name
 * @param {string} version - Package version
 * @returns {void}
 */
function createCommit (name, version) {
  const commands = [
    ['add', 'package.json', 'package-lock.json'],
    ['commit', '-m', `"Upgrade ${name} to ${version}"`]
  ]
  do {
    const cmd = commands.shift()
    console.log(`git ${cmd.join(' ')}`)
    spawnSync('git', cmd, { stdio: 'inherit' })
  }
  while (commands.length > 0)
}

/**
 * Update outdated packages one at a time and create a git commit for each
 *
 * @param {Array<Map>} packages
 * @returns {void}
 */
function updateAll (packages) {
  do {
    const spec = packages.shift()
    const name = spec.get('Package')
    const version = spec.get('Wanted')
    updatePackage(name)
    createCommit(name, version)
  }
  while (packages.length > 0)
}

async function main () {
  try {
    await exec('npm outdated')
    console.log('All packages up to date')
  } catch (e) {
    if (Object.hasOwnProperty.apply(e, ['stdout'])) {
      await updateAll(parse(e.stdout))
    } else {
      throw e
    }
  }
}

main()
  .then(x => `done: ${x}`)
  .catch(console.error)
