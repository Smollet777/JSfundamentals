(
  () => {
    let queue = [],
      paused = false,
      results;
    this.test = function test(name, fn) {
      queue.push(() => {
        results = document.querySelector('.results');
        results = assert(true, name).appendChild(document.createElement('ul'));
        fn();
      });
      runTest();
    };
    this.pause = () => paused = true;
    this.resume = () => {
      paused = false;
      setTimeout(runTest, 1);
    };

    function runTest() {
      if (!paused && queue.length) {
        queue.shift()();
        if (!paused) resume();
      }
    }
    this.assert = function assert(value, desc) {
      let li = document.createElement('li');
      li.className = value ? 'pass' : 'fail';
      li.appendChild(document.createTextNode(desc));
      results.appendChild(li);
      if (!value) li.parentNode.parentNode.className = 'fail';
      return li;
    };
  }
)();
window.onload = function () {
  test('Async test #1', () => {
    pause();
    setTimeout(() => {
      assert(true, 'First test completed.');
      resume();
    }, 1000);
  });
  test('Asunc test #2', () => {
    pause();
    setTimeout(() => {
      assert(true, 'Second test completed.');
      resume();
    }, 1000);
  });
}