const createNode = function (value) {
  return { value, left: null, right: null };
};

const insert = function (tree, value) {
  if (tree === null) {
    return createNode(value);
  }

  if (tree.value > value) {
    tree.left = insert(tree.left, value);
  } else {
    tree.right = insert(tree.right, value);
  }
  return tree;
};

const createDiv = function (classes) {
  const div = document.createElement('div');
  classes.forEach((className) => div.classList.add(className));
  return div;
};

const getRowElements = function (tree, index = 0, rows = [[]]) {
  row = rows[index] === undefined ? [] : rows[index];
  if (tree === null) {
    row.push('');
    rows[index] = row;
    return rows;
  }
  row.push(tree.value);
  rows[index] = row;
  index += 1;
  rows = getRowElements(tree.left, index, rows);
  rows = getRowElements(tree.right, index, rows);
  return rows;
};

const createRow = function (elements, index) {
  const className = index % 2 === 0 ? 'node_odd' : 'node_even';
  let div = createDiv(['level']);
  elements.forEach((element) => {
    const currentClass = element !== '' ? [className, 'node'] : ['node'];
    const elementDiv = createDiv(currentClass);
    elementDiv.innerText = element;
    div.appendChild(elementDiv);
  });
  return div;
};

const visualize = function (tree) {
  const rows = getRowElements(tree);
  const rowsHTML = rows.map(createRow);
  const parent = document.getElementById('tree');
  parent.style.width = `${rows.length * 200}px`;
  [...rowsHTML].forEach((row) => parent.appendChild(row));
};

const main = function () {
  const list = [10, 5, 15, 1, 6, 16, 12, -1, 3, 5.5, 7, 11, 13, 15.5];
  const tree = list.reduce(insert, null);
  console.log(JSON.stringify(tree, null, 2));
  visualize(tree);
};

window.onload = main;
