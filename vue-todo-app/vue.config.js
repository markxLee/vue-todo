const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      },
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
