[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10289402)
# Práctica Espree logging

## Resumen de lo aprendido

### Recorrer arbol AST

Con ayuda de la librería [estraverse](https://www.npmjs.com/package/estraverse) se puede recorrer el árbol AST de un código JavaScript.
Además de recorrer el árbol, se puede modificar el mismo accediendo al body del nodo que nos da estraverse.

```javascript
estraverse.traverse(ast, {
  enter: function (node, parent) {
    // Con el parametro node podemos acceder a la 
    // información del nodo actual y editarla
  },
});
```

Vemos que podemos optener el tipo de nodo con la propiedad `type` y de esta forma podemos filtrar los nodos que queremos recorrer (`FunctionDeclaration` o `FunctionExpression`).
También se puede acceder a los parámetros de una función con la propiedad `params` del nodo `FunctionDeclaration` o `FunctionExpression`.

```javascript
estraverse.traverse(ast, {
  enter: function (node, parent) {
    if (node.type === "FunctionDeclaration" || 
          node.type === "FunctionExpression") {
      console.log(node.params);
    }
  },
});
```

### Publicar un paquete en NPM

Para publicar un paquete en NPM, se debe crear un usuario en [npmjs.com](https://www.npmjs.com/).
Una vez creado el usuario, se debe iniciar sesión en la terminal con el comando `npm login`.
Luego, se debe crear un archivo `package.json` con la información del paquete, importante añadir el scope en la propidad `name`.
Ejemplo:
```json
{
  "name": "@aluXXX/espree-logging",
}
```
Finalmente, se debe ejecutar el comando `npm publish --access=public` para publicar el paquete.

### Documentar con JSDoc to Markdown

Para documentar un paquete, se debe instalar la librería [jsdoc-to-markdown](https://www.npmjs.com/package/jsdoc-to-markdown).
Para generar la documentación, se debe ejecutar el comando `jsdoc2md --files index.js > jsdoc/README.md`.

### Covering con c8

Al usar nyc para hacer covering, he descubierto que no es compatible con la última versión de Node.js (v15.0.0).
Por lo tanto, he decidido usar [c8](https://www.npmjs.com/package/c8) que es un fork de nyc que sí es compatible con la última versión de Node.js.
Para generar el reporte de covering, se debe instalar c8 con el comando `npm install --save-dev c8`.
Para generar el reporte, se debe ejecutar el comando `c8 npm test -- --reporter=html --reporter=text --reports-dir docs`.

## Indicar los valores de los argumentos

Se ha modificado el código de `logging-espree.js` para que el log también indique los valores de los argumentos que se pasaron a la función. 
Ejemplo:

```javascript
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```

```javascript
function foo(a, b) {
    console.log(`Entering foo(${ a }, ${ b })`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z })`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
```

## CLI con [Commander.js](https://www.npmjs.com/package/commander)

Se ha añadido un CLI para poder ejecutar el programa desde la terminal.
Para ello, se ha usado la librería [Commander.js](https://www.npmjs.com/package/commander).
Para ejecutar el programa, se debe ejecutar el comando `./bin/log.js <file.js>`.
Para ver la ayuda, se debe ejecutar el comando `./bin/log.js --help`.
Para ver la versión, se debe ejecutar el comando `./bin/log.js -V`.
Para añadir un output, se debe ejecutar el comando `./bin/log.js <file.js> -o <output.js>`.
Para sacar el resultado por pantalla, se debe ejecutar el comando `./bin/log.js <file.js> -s`.

## Reto 1: Soportar funciones flecha

Se ha añadido soporte para funciones flecha.
Para ello, se ha añadido un nuevo tipo de nodo (`ArrowFunctionExpression`) a la función de entrada de estraverse.

```javascript
estraverse.traverse(ast, {
  enter: function (node, parent) {
    if (node.type === "FunctionDeclaration" || 
          node.type === "ArrowFunctionExpression" ||
          node.type === "FunctionExpression") {
      console.log(node.params);
    }
  },
});
```

## Reto 2: Añadir el número de línea

Se ha añadido el número de línea a la salida del log.
Para ello, se ha añadido la propiedad `loc` al nodo `FunctionDeclaration` o `FunctionExpression` y se ha accedido a la propiedad `start` para obtener el número de línea.

```javascript
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(`Entering "
    + name + "(" + paramNames + ") at line " + lineN + "`);";
  const beforeNode = espree.parse(beforeCode, { ecmaVersion: 12 }).body;
  node.body.body = beforeNode.concat(node.body.body);
```

## Tests and Covering

Para ejecutar los tests, se debe ejecutar el comando `npm test`.
Para ejecutar el covering, se debe ejecutar el comando `npm run cov`.
Para generar el reporte de covering, se debe ejecutar el comando `npm run cov-docs`.
