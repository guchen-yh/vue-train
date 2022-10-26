const path = require('path')
const {build} = require('esbuild')

const args = require('minimist')(process.argv.slice(2)) // 解析用户执行命令行的参数
// 这个是打败的哪一个模块
const target = args._[0] || 'reactivity'
const format = args.f || 'global'

const pkg = require(path.resolve(__dirname, `../packages/${target}/package.json`))

const outputFormat = format.startswWith('global')
    ? 'iife' 
    : format === 'cjs'
    ? 'cjs'
    : 'esm'

const outfile = path.resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

build({
    entryPoints: [path.resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle:true,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    paltform: format === 'cjs' ? 'node' : 'browser',
    watch: {
        // 监控文件变化
        onRebuild(){
            if(!error) console.log(`rebuilt~~~~`)
        }
    }
}).then(() => {
    console.log('watching~~~')
})