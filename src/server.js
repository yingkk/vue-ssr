/**2.与服务器集成 */
const express = require('express');
const app = express();
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require("../dist/vue-ssr-client-manifest.json");

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../dist/favicon.ico')));

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template:  require('fs').readFileSync('/index.template.html', 'utf-8'), // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

//页面级别缓存
const microCache  = LRU({
    max: 100,
    maxAge: 1000 // 重要提示：条目在 1 秒后过期。
  })

  const cacheAbleList = [
    '/',
    '/about'
  ]
  
  const isCacheable = req => cacheAbleList.includes(req.url);
  app.get('*', (req, res) => {
    const context = { url: req.url, title: 'hello'};
    const cacheable = isCacheable(req);
    if (cacheable) {
        const data = microCache.get(req.url);
        if (data) {
          return res.end(data);
        }
      }
   
    renderer.renderToString(context, (err, html) => {
        res.end(html)
        if (cacheable) {
          microCache.set(req.url, html)
        }
    })
  });
  app.listen(8080,() => {
      console.log('服务已开启')
  })

// server.get('*', (req, res) => {
//     const context = {
//         url: req.url,
//         title: 'hello',
//        meta: `
//        <meta name="keyword" content="vue,ssr">
//        <meta name="description" content="vue srr demo">
//       `
//     }
//     const app = new Vue({
//         data:{
//             url: req.url
//         },
//         template: '<div>访问的Url是{{ url }}</div>'
//     })

//     renderer.renderToString(app, context, (err, html) => {
//         console.log(html)
//     })
// })







/**1.渲染一个Vue实例 */
// //1.创建vue实例
// const Vue  = require('vue');
// const app = new Vue({
//     template: '<div>Hello Word</div>'
// })
// //2.创建render
// const render = require('vue-server-renderer').createRenderer();


// //3.将vue渲染成HTML
// render.renderToString(app, (err, html) => {
//     if(err) throw err
//     console.log(html)
// })

// //在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
// render.renderToString(app).then(html => {
//     console.log(html)
// }).catch(err =>{
//      console.log(err)
// })







