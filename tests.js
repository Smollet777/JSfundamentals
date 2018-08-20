function assert(value, desc) {
  let li = document.createElement('li');
  li.className = value ? 'pass' : 'fail';
  li.appendChild(document.createTextNode(desc));
  document.querySelector('.results').appendChild(li);
}

window.onload = function () {
  assert(true, 'The test suit is running.');
  assert(false, 'The test is failed!');
}