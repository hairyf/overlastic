import path from 'node:path'
import { getPackages } from '@manypkg/get-packages'
import fs from 'fs-extra'

const defaultGlobalPackage = {
  license: 'MIT',
  homepage: 'https://github.com/TuiMao233/unoverlays#readme',
  repository: {
    type: 'git',
    url: 'git+https://github.com/TuiMao233/unoverlays.git',
  },
  bugs: {
    url: 'https://github.com/TuiMao233/unoverlays/issues',
  },
  keywords: [
    'unified',
    'overlay',
    'component',
  ],
  type: 'module',
  main: './src/index.ts',
  publishConfig: {
    exports: {
      '.': {
        import: './dist/index.js',
        require: './dist/index.cjs',
      },
    },
    main: './dist/index.cjs',
    types: './dist/index.d.ts',
    jsdelivr: './dist/index.global.js',
    directory: 'dist',
    linkDirectory: false,
  },
  scripts: {
    build: 'tsup src/index.ts',
    lint: 'eslint .',
    prepublishOnly: 'npm run build',
  },
  files: [
    'dist',
  ],
}

async function update() {
  const { packages } = await getPackages(process.cwd())

  for (const packageInfo of packages) {
    const packageJsonPath = path.join(packageInfo.dir, './package.json')
    const packageJson = Object.assign(defaultGlobalPackage, packageInfo.packageJson)
    await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 })
  }
}

update()
