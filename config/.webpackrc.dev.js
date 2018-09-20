const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "serverUrl": JSON.stringify("http://127.0.0.1:8080"),
            "projectTitle": JSON.stringify("Faster-Framework<br/>后台管理系统")
        })
    ]
};