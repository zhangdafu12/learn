const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);
module.exports = function pluginLog({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = path.get("callee").toString();
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const newNode = template.expression(
            `console.log("filename: (${line}, ${column})")`
          )();
          newNode.isNew = true;

          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};
