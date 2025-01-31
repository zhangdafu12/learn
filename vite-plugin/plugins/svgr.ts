import { Plugin, transformWithEsbuild } from "vite";
import * as fs from "fs";
import * as resolve from "resolve";

interface SvgrOptions {
  defaultExport: "url" | "component";
}

export default function viteSvgrPlugin(options: SvgrOptions): Plugin {
  const { defaultExport = "component" } = options;

  return {
    name: "vite-plugin-svgr",
    // enforce: "pre",
    async load(id) {
      if (!id.endsWith(".svg")) {
        return null;
      }
      console.log("load");
      console.log(id);
      const svg = await fs.promises.readFile(id, "utf8");
      console.log(svg);
    },
    async transform(code, id) {
      // 1. 根据 id 入参过滤出 svg 资源；
      if (!id.endsWith(".svg")) {
        return code;
      }
      console.log("code");
      console.log(code);
      console.log(id);

      const svgrTransform = require("@svgr/core").transform;

      // 2. 读取 svg 文件内容；
      const svg = await fs.promises.readFile(id, "utf8");
      // 3. 利用 `@svgr/core` 将 svg 转换为 React 组件代码
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: "ReactComponent" }
      );
      console.log(svgrResult);

      // 4. 处理默认导出为 url 的情况
      let componentCode = svgrResult;
      if (defaultExport === "url") {
        // 加上 Vite 默认的 `export default 资源路径`
        componentCode += code;
        componentCode = svgrResult.replace(
          "export default ReactComponent",
          "export { ReactComponent }"
        );
      }
      // 5. 利用 esbuild，将组件中的 jsx 代码转译为浏览器可运行的代码;

      //a. 单独引入esbuild
      // 解析 esbuild 的路径，后续转译 jsx 会用到，我们这里直接拿 vite 中的 esbuild 即可
      // const esbuildPackagePath = resolve.sync("esbuild", {
      //   basedir: require.resolve("vite"),
      // });
      // const esbuild = require(esbuildPackagePath);
      //  const result = await esbuild.transform(componentCode, {
      //    loader: "jsx",
      //  });

      //b. 使用vite暴露出来的方法
      const result = await transformWithEsbuild(componentCode, id, {
        loader: "jsx",
      });
      console.log(result);

      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}
