module.exports = {
	devServer : {
		proxy: {
			'^/api': {
				target: 'http://localhost',
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: {'^/api':'/'},
			},
		}
	}
}