const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "serverUrl": JSON.stringify("http://139.199.23.31:8080"),
            "projectTitle": JSON.stringify("Faster-Framework<br/>后台管理系统")
        })
    ]
};