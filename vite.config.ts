import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteSvgIcons from 'vite-plugin-svg-icons'

const setAlias = (alias: [string, string][]) => alias.map(v => {return { find: v[0], replacement: path.resolve(__dirname, v[1]) }})
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const root = process.cwd()
    const env = loadEnv(mode, root) as unknown as ImportMetaEnv
    return {
        resolve: {
            alias: setAlias([
                ['/@', 'src'],
                ['/server', 'server']
            ])
        },
        server: {
            proxy: {
                '/api': {
                  target: 'https://github.com/biosafe',
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, '/api')
                }
            },
            port: env.VITE_PORT
        },
        build: {
            // sourcemap: true,
            manifest: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'element-plus': ['element-plus'],
                        echarts: ['echarts'],
                        pinyin: ['pinyin']
                    }
                }
            },
            chunkSizeWarningLimit: 600
        },
        plugins: [
            vue(),
            viteSvgIcons({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    require('autoprefixer'),
                    require('tailwindcss/nesting'),
                    require('tailwindcss'),
                    require('postcss-simple-vars'),
                    require('postcss-import')
                ]
            }
        }
    }
}
