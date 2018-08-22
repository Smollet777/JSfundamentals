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
  /*
  test('Callback test', () => {
    let text = 'Domo arigato!'
    assert(useless(text, function () {
      return text;
    }) === text, "The useless function works!" + text);
    assert(true, "somedescriptivetext");
  });
  test('Scope test.', () => {
    assert(true, "  - - - - - BEFORE OUTER - - - - -  ");
    assert(typeof outer === 'function', "outer() is in scope");
    assert(typeof inner !== 'function', "inner() is NOT in scope");
    assert(typeof a !== 'number', "а is NOT in scope");
    assert(typeof b !== 'number', "b is NOT in scope");
    assert(typeof c !== 'number', "с is NOT in scope");

    function outer() {
      assert(true, "  - - - - - INSIDE OUTER,BEFORE A - - - - -  ");
      assert(typeof outer === 'function', "outer() is in scope");
      assert(typeof inner === 'function', "inner() is in scope");
      assert(typeof a !== 'number', "а is NOT in scope");
      assert(typeof b !== 'number', "b is NOT in scope");
      assert(typeof c !== 'number', "с is NOT in scope");
      var a = 1;
      assert(true, "  - - - - - INSIDE OUTER,AFTER A - - - - -  ");
      assert(typeof outer === 'function', "outer() is in scope");
      assert(typeof inner === 'function', "inner() is in scope");
      assert(typeof a === 'number', "а is in scope");
      assert(typeof b !== 'number', "b is NOT in scope");
      assert(typeof c !== 'number', "с is NOT in scope");

      function inner() {}
      var b = 2;
      assert(true, "  - - - - - INSIDE OUTER,AFTER INNER AND B - - - - -  ");
      assert(typeof outer === 'function', "outer() is in scope");
      assert(typeof inner === 'function', "inner() is in scope");
      assert(typeof a === 'number', "а is in scope");
      assert(typeof b === 'number', "b is in scope");
      assert(typeof c !== 'number', "с is NOT in scope");
      if (a == 1) {
        assert(true, "  - - - - - INSIDE OUTER,INSIDE IF,BEFORE C - - - - -  ");
        assert(typeof outer === 'function', "outer() is in scope");
        assert(typeof inner === 'function', "inner() is in scope");
        assert(typeof a === 'number', "а is in scope");
        assert(typeof b === 'number', "b is in scope");
        assert(typeof c !== 'number', "с is NOT in scope");
        var c = 3;
      }
      assert(true, "  - - - - - INSIDE OUTER,AFTER IF - - - - -  ");
      assert(typeof outer === 'function', "outer() is in scope");
      assert(typeof inner === 'function', "inner() is in scope");
      assert(typeof a === 'number', "а is in scope");
      assert(typeof b === 'number', "b is in scope");
      assert(typeof c === 'number', "с is in scope");
    }
    outer();
    assert(true, "  - - - - - AFTER OUTER - - - - -  ");
    assert(typeof outer === 'function', "outer() is in scope");
    assert(typeof inner !== 'function', "inner() is NOT in scope");
    assert(typeof a !== 'number', "а is NOT in scope");
    assert(typeof b !== 'number', "b is NOT in scope");
    assert(typeof c !== 'number', "с is NOT in scope");
  });
}
let useless = (text, callback) => callback();*/
  const juggler1 = {}
  const juggler2 = {}

  function juggle() {
    let result = 0
    for (let i = 0; i < arguments.length; i++) {
      result += arguments[i]
    }
    this.result = result
  }

  juggle.call(juggler1, 1, 2, 3, 4, 5)
  juggle.apply(juggler2, [1, 2, 3, 4, 5])

  test('Call and apply test', () => {
    assert(juggler1.result === 15, 'juggled via call');
    assert(juggler2.result === 15, 'juggled via apply');
  })
}