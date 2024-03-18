import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };
import typescript from "@rollup/plugin-typescript";

const out = './dist'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: `${out}/index.cjs`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${out}/index.js`,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            // resolve(), // so Rollup can find `ms`
            typescript(), // so Rollup can parse TypeScript
            commonjs() // so Rollup can convert `ms` to an ES module
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    // {
    //     input: 'src/main.js',
    //     external: ['ms'],
    //     output: [
    //         {file: pkg.main, format: 'cjs'},
    //         {file: pkg.module, format: 'es'}
    //     ]
    // }
];
