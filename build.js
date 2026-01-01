import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const srcDir = path.resolve('src', 'apps')

const bookmarklets = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)

for (const name of bookmarklets) {
  console.log(`\nBuilding bookmarklet: ${name}`)
  execSync(`npx vite build --mode ${name}`, {
    stdio: 'inherit'
  })
}
