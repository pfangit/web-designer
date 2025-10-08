import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { program } from 'commander';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

import packageJson from './package.json';

program.option('-f, --format <char>');

program.parse();

const options = program.opts();
const format = options.format || 'es';

const multipleInputsMode = ['es', 'cjs'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    libInjectCss(),
    dts({ rollupTypes: true, outDir: resolve(__dirname, `dist/${format}`) }),
    tailwindcss()
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 这里可以配置 Less 的选项
      }
    }
  },
  build: {
    lib: {
      entry: './src/index.tsx'
    },
    rolldownOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        ...Object.keys(packageJson.dependencies || {}),
        // @ts-expect-error 可能不存在peer依赖
        ...Object.keys(packageJson.peerDependencies || {})
      ],
      ...(multipleInputsMode.indexOf(format) === -1 && {
        output: [
          {
            format: format,
            name: 'lib_global_name',
            //配置打包根目录
            dir: resolve(__dirname, `dist/${format}`)
          }
        ]
      }),
      ...(multipleInputsMode.indexOf(format) !== -1 && {
        input: Object.fromEntries(
          glob.sync('src/**/*.{ts,tsx}').map((file) => [
            // The name of the entry point
            // src/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // src/nested/foo.ts becomes /project/src/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
        output: [
          {
            //打包格式
            format: format,
            //打包后文件名
            entryFileNames: (chunkInfo) => {
              // 获取原始模块路径并转换为输出路径
              const moduleId = chunkInfo.facadeModuleId;
              if (moduleId) {
                const relativePath = moduleId.replace(process.cwd() + '/src/', '');
                return relativePath.replace(/\.[^/.]+$/, '.js');
              }
              return '[name].js';
            },
            chunkFileNames: (chunkInfo) => {
              console.log(chunkInfo);
              // 对于动态导入的chunk也保持结构
              return 'chunks/[name]-[hash].js';
            },
            //让打包目录和我们目录对应
            preserveModules: true,
            exports: 'auto',
            //配置打包根目录
            dir: resolve(__dirname, `dist/${format}`)
          }
        ]
      })
    }
  }
});
