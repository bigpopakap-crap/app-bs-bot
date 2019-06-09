import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
// @ts-ignore TODO figure this out
import webpackConfig from "../../webpack.config.dev";
// TODO figure out why absolute imports aren't working here
import api from "./api";
import {API_PATH} from "../shared/constants";

const PORT = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
const app = express();

app.use(webpackMiddleware(compiler));
app.use(
  webpackHotMiddleware(compiler, {
    // @ts-ignore TODO remove this ignore
    hot: true,
    reload: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
);

app.use(API_PATH, api);

// TODO this thing shouldn't have to know that public is in "src/"
app.use(express.static("src/public"));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});
