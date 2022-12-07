const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./sample.txt');

// ignoring the $ ls commands
const output = input
  .split('\n')
  .filter((c) => c !== '$ ls')
  .filter((c) => c !== '');

interface TreeNode {
  path: string;
  type: 'dir' | 'file';
  size: number;
  children: TreeNode[];
}

// starting node
const tree: TreeNode = {
  path: '/',
  type: 'dir',
  size: 0,
  children: [],
};

function searchTree(node: TreeNode, path: string) {
  if (node.path === path) {
    return node;
  }

  if (node.children) {
    let result: TreeNode | undefined;
    for (let i = 0; i < node.children.length; i++) {
      result = searchTree(node.children[i], path);
      if (result) break;
    }
    return result;
  }

  return undefined;
}

let currentPath: string[] = ['/'];
const getCurrentPath = () => currentPath.join('/').replace('//', '/');

function processChangeDir(command: string) {
  const path = command.slice(5);

  if (path === '/') {
    currentPath = ['/'];
  } else if (path == '..') {
    currentPath.pop();
  } else {
    currentPath.push(path);
  }
}

function processDir(command: string) {
  // if we get here, we need to add a new node to the tree
  const currentPath = getCurrentPath();
  const dirName = command.slice(4);
  const path = `${currentPath}/${dirName}`.replace('//', '/');

  const newNode: TreeNode = {
    path,
    type: 'dir',
    size: 0,
    children: [],
  };

  const parent = searchTree(tree, currentPath);
  if (!parent) return;
  parent.children.push(newNode);
}

function processFile(command: string) {
  const [size, fileName] = command.split(' ');
  const currentPath = getCurrentPath();
  const path = `${currentPath}/${fileName}`.replace('//', '/');

  const newNode: TreeNode = {
    path,
    type: 'file',
    size: parseInt(size),
    children: [],
  };

  const parent = searchTree(tree, currentPath);
  if (!parent) return;
  parent.children.push(newNode);
}

// iterate the output and build the tree
output.forEach((c) => {
  // process cd commands
  if (c.slice(0, 4) === '$ cd') {
    processChangeDir(c);
    return;
  }

  // process dir
  if (c.slice(0, 4) === 'dir ') {
    processDir(c);
    return;
  }

  // process a filename
  processFile(c);
});

// calc size of directories
interface DirSize {
  path: string;
  size: number;
}

const sizes: DirSize[] = [];

function walkTree(node: TreeNode) {
  const fileSum = node.children
    .filter((x) => x.type === 'file')
    .reduce((acc, curr) => acc + curr.size, 0);

  let dirSum = 0;
  const childDirs = node.children.filter((x) => x.type === 'dir');
  childDirs.forEach((c) => {
    dirSum += walkTree(c);
  });

  const size = fileSum + dirSum;
  sizes.push({path: node.path, size});

  return size;
}

walkTree(tree);

// part a - sum of dir sizes less than 100,000
const partASum = sizes
  .filter((x) => x.size <= 100000)
  .reduce((acc, curr) => acc + curr.size, 0);

console.log({partASum});

// part b
const totalSpace = 70000000;
const installSize = 30000000;
const rootSize = sizes.find((x) => x.path === '/')?.size ?? 0;
const unusedSpace = totalSpace - rootSize;
const spaceNeeded = installSize - unusedSpace;

// sort the dirs
const sorted = sizes.sort((a, b) => a.size - b.size);
const dirToDelete = sorted.find((x) => x.size >= spaceNeeded);
console.log({dirToDelete});
