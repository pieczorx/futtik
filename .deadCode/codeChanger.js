
const xd = async () => {
  const esprima = require('esprima');
  const escodegen = require('escodegen');
  const program = await readFile('deobFile.js', 'utf8');

  let nodes = esprima.parseScript(program);


  console.log('nudeski', nodes);

  loopThroughNodes(nodes.body, node => {
    editSingleNode(node);
  });

  const finalProgram = escodegen.generate(nodes);

  fse.outputFile('deobFileOutput.js', finalProgram);
}

const loopThroughNodes = (nodes, fn) => {
  console.log(nodes.length, nodes);

  nodes.forEach(node => {
    fn(node);
    if(!node.body) {
      return;
    }

    if(Array.isArray(node.body)) {
      return loopThroughNodes(node.body, fn);
    }

    if(Array.isArray(node.body.body)) {
      return loopThroughNodes(node.body.body, fn);
    }

    if(Array.isArray(node.body.body)) {

    }
  });
}

const editSingleNode = (node) => {
  if(node.type == "VariableDeclaration") {
    node.declarations.forEach(declaration => {
      if(declaration.init && declaration.init.type == 'Literal') {
        declaration.init.value = declaration.init.raw = 'XD';
      }
    });
  }
}

const isVar = (node) => {

}
