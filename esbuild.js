const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const uglify = require('uglify-js');

const useWatch = process.argv.includes('--watch');
const useMinify = process.argv.includes('--minify');

const dest = {
    entry: path.resolve('./src/main.js'),
    bundle: path.resolve('./dist/build.js'),
    html: path.resolve('./index.html'),
};

function minify() {
    fs.writeFileSync(dest.bundle, uglify.minify(fs.readFileSync(dest.bundle).toString(), {}).code);
}

function html() {
    var html = '';
    html += '<html><title>SHUTTLEDECK</title>';
    html += '<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" sizes="64x64"/>';
    html += '<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0\">';
    html += '<style>canvas{width:100%;height:100%;}body{margin:0;background:#000;}</style>';
    html += '<canvas><script>';
    html += fs.readFileSync(dest.bundle);
    html += '</script></html>';
    fs.writeFileSync(dest.html, html);
}

let postBuildPlugin = {
    name: 'Post-Build',
    setup(build) {
        build.onEnd(async() => {
            if (useMinify) {
                minify();
            }
            html();
            console.log(`[${new Date().toISOString()}] build complete!`);
        })
    },
}

esbuild.build({
    entryPoints: [dest.entry],
    outfile: dest.bundle,
    bundle: true,
    watch: useWatch,
    plugins: [postBuildPlugin],
});