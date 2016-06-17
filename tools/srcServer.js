const isDev = process.env.NODE_ENV!=='production';
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT ||3000;
const app = express();
const compiler = webpack(config);


console.log('Current env is dev',isDev);

isDev && app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

isDev && app.use(require('webpack-hot-middleware')(compiler));
!isDev && compiler.run((err,stats)=>{
  console.log('bundle created',err);
});

!isDev && app.use(express.static(path.join( __dirname, '../dist')));
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
