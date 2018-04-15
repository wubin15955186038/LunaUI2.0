module.exports = {
    devtool: 'eval-source-map',
    
    entry: __dirname + '/src/main.js',
    
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/'
    },

    devServer: {
        contentBase: './public', //以public为根目录提供文件
        colors: true,
        inline: true,
        historyApiFallback: true
    }
}