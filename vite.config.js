import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/plugins/svgBuilder";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import dayjs from "dayjs";
// 手动导入
import ElementPlus from "unplugin-element-plus/vite";
export default ({ mode }) => {
  const {
    VITE_APP_FAV,
    VITE_APP_SEO_ICON,
    VITE_APP_TITLE,
    VITE_APP_DESCRIPTION,
  } = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      // 网站相关
      createHtmlPlugin({
        minify: true,
        inject: {
          // 变量定义
          data: {
            APP_FAV: `/fav/${VITE_APP_FAV}.svg`,
            // APP_NODE: `/invite/${VITE_APP_ENV}.png`,
            APP_TITLE: VITE_APP_TITLE, // 网站标题
            APP_DESCRIPTION: VITE_APP_DESCRIPTION,
            APP_SEO_ICON: `/seoIcon/${VITE_APP_SEO_ICON}.svg`,
          },
        },
      }),
      ElementPlus({
        useSource: true,
      }),
      // 自动引入
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: "sass",
          }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式
            importStyle: "sass",
          }),
        ],
      }),
      svgBuilder("./src/assets/icons/"),
      // 配置html文件引用
      createHtmlPlugin({
        minify: true,
        inject: {
          // 变量定义
          data: {
            // APP_FAV: `/fav/${VITE_APP_ENV}.png`,
            // APP_NODE: `/invite/${VITE_APP_ENV}.png`,
          },
        },
      }),
      viteCompression(),
    ],
    build: {
      // target: 'es2015',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false, // 是否开启sourcemap
      minify: "terser", // 混淆器，terser构建后文件体积更小
      rollupOptions: {
        // 文件超出500k
        output: {
          entryFileNames: `assets/[name].[hash].${dayjs().valueOf()}.js`,
          chunkFileNames: `assets/[name].[hash].${dayjs().valueOf()}.js`,
          assetFileNames: `assets/[name].[hash].${dayjs().valueOf()}.[ext]`,
          compact: true,
          manualChunks(id) {
            // if (id.includes("node_modules")) {
            //   return id
            //     .toString()
            //     .split("node_modules/")[1]
            //     .split("/")[0]
            //     .toString();
            // }
            return {
              vue: ["vue", "vue-router", "pinia"],
            };
          },
        },
        // output: {
        //   manualChunks(id) {
        //     if (id.includes("node_modules")) {
        //       return id
        //         .toString()
        //         .split("node_modules/")[1]
        //         .split("/")[0]
        //         .toString();
        //     }
        //   },
        // },
      },
    },
    resolve: {
      alias: {
        // util$: resolve(__dirname, "node_modules/util"),
        "@/": `${path.resolve(__dirname, "src")}/`,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // modifyVars: {
          //   hack: `true;
          //   @use (reference) "${resolve("src/style/variables.scss")}";`, // scss全局变量导入
          // },
          // prependData: `@import "${resolve("src/style/variables.scss")}";`,
          // javascriptEnabled: true,
          // scss全局变量导入 以及使用主题
          // additionalData: `@use "${resolve(
          //   "src/style/element/variables.scss"
          // )}" as * ;`,
          additionalData: `@use "@/style/variables.scss" as *;`,
        },
      },
    },
    base: "/", // 设置打包路径
    server: {
      host: "0.0.0.0",
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // 反向代理设置，禁止使用跨域api https://web.taya.boo/
      proxy: {
        "/api": {
          // target: 'http://b.apollo.sunbank.io:8080/',
          // target: "https://1xwinadmin.all-in.vip/", // 开发环境
          target: "https://web.taya.boo/", // 測試環境
          changeOrigin: true,
          secure: false,
        },
        "/payment": {
          // target: "https://1xwinadmin.all-in.vip/", // 开发环境
          target: "http://testpc.777vipsss-a.com/", // 测试环境
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
