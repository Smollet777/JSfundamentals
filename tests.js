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
  test('Прототипы в качестве образцов для объектов', () => {
    function Ninja() {}
    Ninja.prototype.swingSword = function () {
      return true
    }

    const ninja1 = Ninja()
    assert(ninja1 === undefined, 'No instance of Ninja created')

    const ninja2 = new Ninja()
    assert(ninja2 &&
      ninja2.swingSword &&
      ninja2.swingSword(),
      'Instance exists and method is callable')
  })

  test('Свойства экземпляра объекта', () => {
    function Ninja() {
      this.swung = false
      this.swingSword = function () {
        return !this.swung
      }
    }

    Ninja.prototype.swingSword = function () {
      return this.swung
    }

    const ninja = new Ninja()
    assert(ninja.swingSword(), 'Called the instance method,not the prototype method')
  })

  test('Увязывание ссылок', () => {
    function Ninja() {
      this.swung = true
    }
    const ninja = new Ninja()

    Ninja.prototype.swingSword = function () {
      return this.swung
    }

    assert(ninja.swingSword(), 'Method exists, even out of order')
  })

  //test('click on body or div',()=>{})
  /*
    test('Временная область действия и частные переменные', () => {
      // простой counter. numClicks сохраняется для eventListener'а в замыкании
      document.addEventListener('click', (() => {
        let numClicks = 0;
        return () => alert(++numClicks)
      })(), false);
    })*/
  /*
    test('Соблюдение имен в области действия через параметры', function () {});

    document.addEventListener('click', ((start, end) => { // назначение аргументов в IIFE
        let numClicks = 0;
        return () => alert(`${start}${++numClicks}${end}`)
      })('You cliked ', ' times'), // передача аргументов и IIFE
      false);


    // в замыканиях сохраняют­ся только ССЫЛКИ на включаемые в них переменные, а не их конкретные значения в тот момент, когда они создаются
    // используем IIFE 
    let divs = document.getElementsByTagName('div');
    // заметь var
    for (var i = 0; i < divs.length; i++)(function (n) {

      // передаём порядковый номер функции немедленного вызова, тем самым, включаем его в замыкание внутренней функции. 
      divs[n].addEventListener('click', function () {
        alert(`div ${n+1} was clicked.`);
      }, false);
    })(i); // В пределах области действия на каждом шаге цикла переменная i определяется заново
  */
  /* 
  // пример сокращения кода 
  // без ввода переменной с именем покороче(из библиотеки Prototype)

  // ! не let v = Element._attributeTranslations.read.values
  (
    function (v) {
      Object.extend(v, {
        href: v._getAttr,
        src: v._getAttr,
        type: v._getAttr,
        action: v._getAttrNode,
        disabled: v._flag,
        checked: v._flag,
        readonly: v._flag,
        multiple: v._flag
        //...
      });
    }
  )(Element._attributeTranslations.read.values); 
  */

  /*
  test('Кеширование с помошью функций', function () {

  Function.prototype.memoized=function(key){
    this._values=this._values||{}// проверить, существует ли свойство,
    // а иначе создать его объект, чтобы сохранить кешированные значения
  
    return this._values[key] !== undefined ? // проверить при вызове с ключом, имеется ли для него в кеше значение
      this._values[key] : // возвратить значение
      this._values[key] = this.apply(this,arguments) // сохранить значение для последующих вызовов
  }

  function isPrime(num) {
    let prime = num != 1;
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i == 0) {
        prime = false;
        break;
      }
    }
    return prime;
  }

    assert(isPrime._values===undefined, 'There is no values yet.');
    assert(isPrime(5), 'Func works; 5 is prime.');
    assert(isPrime.memoized(5), 'func.memoized works; 5 is prime.');
    assert(isPrime._values[5], 'The answer has been cached.');

  });

  test('Кеширование с помощью замыканий',()=>{
    // дублируем ф-ию выше
    Function.prototype.memoized = function (key) {
      this._values = this._values || {}; 
      return this._values[key] !== undefined ?
        this._values[key] :
        this._values[key] = this.apply(this, this.arguments); 
    };
    
    Function.prototype.memoize = function () {
      return  ()=>  // заключить исходную ф-ию в обёртку ф-ии запоминания
         this.memoized.apply(this, arguments);
    };
    
    let isPrime = (function isPrime(num) {
      let prime = num != 1;
      for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i == 0) {
          prime = false;
          break;
        }
      }
      return prime;
    }).memoize();

    assert(isPrime(5), 'func.memoized is automate. No need of "func.memoized(x)".');
  })*/
  /*
    Function.prototype.partial = function () {
      let fn = this,
        args = Array.prototype.slice.call(arguments);
      return function () {
        let arg = 0;
        for (let i = 0; i < args.length && arg < arguments.length; i++)
          if (args[i] === undefined)
            args[i] = arguments[arg++];
        return fn.apply(this, args);
      };
    }
  */
  //String.prototype.csv = String.prototype.split.partial(/,\s*/)
  /*
    test('curry', () => {

      let results = ('Mugan, Jin, Fuu').csv()

      assert(
        results[0] == 'Mugan' &&
        results[1] == 'Jin' &&
        results[2] == 'Fuu',
        'Names were split properly');
    })

    test('curry with skipped args', () => {

      assert(true, '// А call to this function will bе delayed 1s.');
      let delay = setTimeout.partial(undefined, 1000);
      delay(() => {
        assert(true, 'delayed!');
      });

      assert(true, ' Not delayed!');


      assert(true, '// click on body to trigger a function')
      let bindClick = document.body.addEventListener.partial('click', undefined, false);
      bindClick(() =>
        assert(true, 'Click event bound via curried function.')
      );

    })*/
  /*
    test('Перегрузка функций по числу аргументов', () => {

      function addMethod(obj, name, fn) {
        // сохранить предыдущую ф-ию, так как её придётся вызвать,
        let old = obj[name]; // если число параметров и аргументов в переданной ф-ии не совпадает 

        obj[name] = function () { // создать новую анонимную ф-ию, которая становится методом
          if (fn.length === arguments.length) {
            return fn.apply(this, arguments); // вызвать переданную ф-ию, если число её параметров и аргументов совпадает
          } else if (typeof old === 'function') {
            return old.apply(this, arguments); // вызвать предыдущую, если число параметров и аргументов не совпадает
          }
        }
      }

      const ninjas = {
        values: ['Dean Edwards', 'Sam Stephenson', 'Alex Russel']
      };

      addMethod(ninjas, 'find', function () {
        return this.values
      });
      addMethod(ninjas, 'find', function (name) {
        let ret = [];
        for (let i = 0; i < this.values.length; i++)
          if (this.values[i].indexOf(name) === 0)
            ret.push(this.values[i]);
        return ret;
      });
      addMethod(ninjas, 'find', function (name, surname) {
        let ret = [];
        for (let i = 0; i < this.values.length; i++)
          if (this.values[i] === (`${name} ${surname}`))
            ret.push(this.values[i]);
        return ret;
      });

      assert(ninjas.find().length === 3,
        "Found all ninjas");
      assert(ninjas.find("Sam").length === 1,
        "Found ninja bу first name");
      assert(ninjas.find("Dean", "Edwards").length === 1,
        "Found ninja bу first and lastname");
      assert(ninjas.find("Alex", "Russell", "Jr") == null,
        "Found nothing");

    })*/
  /*
    test('Разбиение списка аргументов', () => {

      function multiMax(multi) {
        return multi * Math.max.apply(Math,
          Array.prototype.slice.call(arguments, 1))
      }

      assert(multiMax(3, 1, 2, 4) === 12, 'multiMax(3,1,2,4) (first arg, by largest) 3*4=12')
    })
    test('Обход списка аргументов переменной длины', () => {

      function merge(root) {
        for (let i = 1; i < arguments.length; i++) {
          for (let key in arguments[i]) {
            root[key] = arguments[i][key];
          }
        }
        return root;
      }
      let name = {
        name: 'John'
      };
      let surname = {
        surname: 'Doe'
      };
      let merged = merge(name, surname) // name obj->{name: "John", surname: "Doe"}

      assert(merged.name === 'John', 'Merged object has name "John"')
      assert(merged.surname === 'Doe', 'Merged object has surname "Doe"')
    })

    test('Обобщённые функции min() и max()', () => {
      function smallest(arr) {
        return Math.min.apply(Math, arr)
      }

      function largest(arr) {
        return Math.max.apply(Math, arr)
      }
      assert(smallest([0, 1, 2, 3]) === 0, 'Located the smallest value')
      assert(largest([0, 1, 2, 3]) === 3, 'Located the largest value')
    })
    */
  /*
      test('запоминание однозначных ф-ий в коллекции', () => {
        const store = {
          nextId: 1,
          cache: {},

          add: function (fn) {
            if (!fn.id) {
              fn.id = store.nextId++
              return true
            }
          }
        }

        function ninja() {}
        assert(store.add(ninja), 'Function was safely added.')
        assert(!store.add(ninja), 'But it was only once.')
      })

      test('запоминание вычесленных ранее знечений', () => {

        function isPrime(value) {
          if (!isPrime.answers) isPrime.answers = {}

          if (isPrime.answers[value] != null) {
            return isPrime.answers[value]
          }

          let prime = value !== 1
          for (let i = 2; i < value; i++) {
            if (value % i == 0) {
              prime = false
              break
            }
          }

          return isPrime.answers[value] = prime
        }

        assert(!isPrime.answers, 'There is no values in cache yet')
        assert(isPrime(5), '5 is prime')
        assert(isPrime.answers[5], 'The answer was cached')
      })

      test('имитация методов обработки массивов', () => {

        const elems = {
          length: 0,

          add: function (elem) {
            Array.prototype.push.call(this, elem)
          },

          gather: function (id) {
            this.add(document.getElementById(id))
          }
        }

        elems.gather('first')
        assert(elems.length === 1 && elems[0].nodeType, 'Verify that we have an element in our stash')

        elems.gather('second')
        assert(elems.length === 2 && elems[1].nodeType, 'Verify the other insertion')


      })
      */
  /*
    function forEach(list, callback) {
      for (let i = 0; i < list.length; i++) {
        callback.call(list[i], i)
      }
    }

    test('Custom for-each test', () => {
      const weapons = ['shuriken', 'katana', 'nunchucks']
      forEach(weapons, function (i) {
        assert(this == weapons[i], `Got the expected value of ${weapons[i]}`)
      })
    })*/
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
  /*const juggler1 = {}
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
  })*/
}