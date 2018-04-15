'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => {
    return path.resolve(appDirectory, relativePath);
}
const envPublicUrl = process.env.PUBLIC_URL;
const appName = envPublicUrl && envPublicUrl.split('/').reverse()[0];

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;
function ensureSlash(_path, needsSlash) {
    const hasSlash = _path.endsWith('/');
    if(hasSlash && !needsSlash) {
        return _path.subStr(0, _path.length-1);
    } else if(!hasSlash && needsSlash) {
        return `${_path}/`;
    }
    return _path;
}
const getServedPath = appPackageJson => {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl || (
        publicUrl ? url.parse(publicUrl).pathname : '/'
    );
    return ensureSlash(servedUrl, true);
}
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp(`${appName}`),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};