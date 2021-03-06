var request = require('request');
var chalk = require('chalk');
var packageConfig = require('../package.json');
var ora = require('ora');

module.exports = (done) => {

    var spinner = ora(chalk.gray('正在检查版本...')).start();
    request({
        url: 'https://soaoen.npmjs.org/@song/cli',
        timeout: 1000
    }, (err, res, body) => {

        if (!err && res.statusCode === 200) {
            spinner.stop();
            var latestVersion = JSON.parse(body)['dist-tags'].latest
            var localVersion = packageConfig.version
            if (localVersion !== latestVersion) {
                console.log()
                console.log(chalk.gray('  @song/cli新版本可用.'))
                console.log()
                console.log(chalk.gray('  最新版本: ' + latestVersion))
                console.log(chalk.gray('  本地版本: ' + localVersion))
                console.log()
                console.log('  重新安装获得新特性: ' + chalk.green('npm install -g @song/cli'))
                console.log()
            }
        } else {
            spinner.stop();
        }
        done()
    })
}