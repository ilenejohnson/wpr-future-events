const path = require('path');
const webpack = require( 'webpack' );
const mode = process.env.NODE_ENV || 'development';
const webpackConfig = {
  devtool: 'source-map',
  mode,
  entry: {
    'js/admin': path.resolve(__dirname, 'app/admin.js'),
	'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
	'js/widget': path.resolve(__dirname, 'app/widget.js'),
    
  },
 externals: {
	  
	moment: 'moment',
			
	  
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
  new webpack.DefinePlugin( {
				'process.env.NODE_ENV': JSON.stringify( mode ),
} ),
  
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
		query: {
             	
				plugins: ["@babel/plugin-proposal-class-properties"  ]
				
				
				

				
            },

      },
	  
    ],
	
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = 'cheap-source-map';
}
console.log('mode is ' + process.env.NODE_ENV);
module.exports = webpackConfig;
