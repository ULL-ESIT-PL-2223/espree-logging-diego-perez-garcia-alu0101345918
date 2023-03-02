## Functions

<dl>
<dt><a href="#transpile">transpile(inputFile, outputFile, exec)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Transpile the code in the input file and write the result to the output file.
      If the output file is not specified, the result is written to the console.
      If the exec flag is true, the input code is also written to the console.</p>
</dd>
<dt><a href="#addLogging">addLogging(code)</a> ⇒ <code>string</code></dt>
<dd><p>Find all function declarations, arrow functions, and function expressions in the code.
      Then call addBeforeCode() to add a logging statement before the code of each function.</p>
</dd>
<dt><a href="#addBeforeCode">addBeforeCode(node)</a> ⇒ <code>void</code></dt>
<dd><p>Add a logging statement before the code of a function.</p>
</dd>
</dl>

<a name="transpile"></a>

## transpile(inputFile, outputFile, exec) ⇒ <code>Promise.&lt;void&gt;</code>
Transpile the code in the input file and write the result to the output file.
      If the output file is not specified, the result is written to the console.
      If the exec flag is true, the input code is also written to the console.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| inputFile | <code>string</code> | The name of the input file |
| outputFile | <code>string</code> | The name of the output file |
| exec | <code>boolean</code> | Whether to execute the code |

<a name="addLogging"></a>

## addLogging(code) ⇒ <code>string</code>
Find all function declarations, arrow functions, and function expressions in the code.
      Then call addBeforeCode() to add a logging statement before the code of each function.

**Kind**: global function  
**Returns**: <code>string</code> - - The modified code  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | The code to be modified |

<a name="addBeforeCode"></a>

## addBeforeCode(node) ⇒ <code>void</code>
Add a logging statement before the code of a function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>object</code> | The function node |

