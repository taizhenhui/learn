exports.keys = 'tai.com';

// exports.static = {
//   prefix: "/",
//   // alias: {
//   //   "/": "/index.html",
//   // },
// };

exports.view = {
  mapping: { // 映射配置，将不同的模板后缀映射到对应的模板引擎处理
    ".ejs": "ejs",
    ".html": "ejs"
  },
  defaultViewEngine: "ejs", //如果映射找不到对应的模板引擎，将使用该值作为默认使用的模板引擎
  defaultExtension: ".ejs", //后续在controller中渲染模板时，默认渲染的模板后缀名
};
