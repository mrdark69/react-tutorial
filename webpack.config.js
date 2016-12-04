const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
module.exports = {
  devtool: 'eval',
  entry: './index.js',
  output: {
    publicPath: '/static/',
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  plugins: [
       new webpack.LoaderOptionsPlugin({
          test: /\.scss$/, // may apply this only for some modules
         options: {
          postcss: function(){return [autoprefixer];},
          context: __dirname,
         }
       })
  ],
  module: {
    loaders: [
      {
        // ใช้ Regular Expression ทดสอบ ถ้าไฟล์ไหนลงท้ายด้วย js หรือ jsx
        // ให้ใช้ babel-loader
        test: /\.(js|jsx)$/,
        
        // ไม่รวม node_modules เนื่องจากเป็นของที่คนอื่นเขียน
        // เราไม่ต้องใส่ใจ
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        // สำหรับไฟล์นามสกุล css ให้ใช้ Loader สองตัวคือ css-loader และ style-loader
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
           
        ]
      },
      {

         // ใช้ Loader สามตัวสำหรับ scss
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              module: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          'postcss-loader'
          
          
        ]
      }
    ]
  }
  
};