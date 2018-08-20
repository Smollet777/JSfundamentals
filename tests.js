(() => {
  let results;
  this.assert = function assert(value, desc) {
    let li = document.createElement('li');
    li.className = value ? 'pass' : 'fail';
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if (!value) {
      li.parentNode.parentNode.className = 'fail';
    }
    return li;
  };
  this.test = function test(name, fn) {
    results = document.querySelector('.results');
    results = assert(true, name).appendChild(document.createElement('ul'));
    fn();
  };
})();

window.onload = () => {
  test('A test.', () => {
    assert(true, 'First assertion completed');
    assert(true, 'Second assertion completed');
    assert(true, 'Third assertion completed');
  });
  test('Another test.', () => {
    assert(true, 'Firts test completed');
    assert(false, 'Second test failed');
    assert(true, 'Third test completed');
  });
  test('A third test.', () => {
    assert(null, 'fail');
    assert(5, 'pass');
  });
}