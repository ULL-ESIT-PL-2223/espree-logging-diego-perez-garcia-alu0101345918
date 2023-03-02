import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

/**
 * @function transpile
 * @desc Transpile the code in the input file and write the result to the output file.
 *       If the output file is not specified, the result is written to the console.
 *       If the exec flag is true, the input code is also written to the console.
 * @param {string} inputFile - The name of the input file
 * @param {string} outputFile - The name of the output file
 * @param {boolean} exec - Whether to execute the code
 * @returns {Promise<void>}
 * @async
 */
export async function transpile(inputFile, outputFile, exec) {
  let input = await fs.readFile(inputFile, 'utf8');
  let output = addLogging(input);
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
  if (exec) {
    console.log("Input:");
    console.log(input);
    console.log("---");
    console.log("Output in file " + outputFile);
  }
}

/**
 * @function addLogging
 * @desc Find all function declarations, arrow functions, and function expressions in the code.
 *       Then call addBeforeCode() to add a logging statement before the code of each function.
 * @param {string} code - The code to be modified
 * @returns {string} - The modified code
 */
export function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 12, loc: true });
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type === "FunctionDeclaration" ||
        node.type === "ArrowFunctionExpression" ||
        node.type === "FunctionExpression") {
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

/**
 * @function addBeforeCode
 * @desc Add a logging statement before the code of a function.
 * @param {object} node - The function node
 * @returns {void}
 */
function addBeforeCode(node) {
  const name = node.id ? node.id.name : "<anonymous function>";
  let paramNames = "";
  if (node.params.length) {
    paramNames = "${" + node.params.map(p => p.name).join("}, ${") + "}";
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(`Entering "
    + name + "(" + paramNames + ") at line " + lineN + "`);";
  const beforeNode = espree.parse(beforeCode, { ecmaVersion: 12 }).body;
  node.body.body = beforeNode.concat(node.body.body);
}
