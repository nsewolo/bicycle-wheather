describe('Function challenges', () => {

  test('Identity', () => {
    const result = identity(5);
    expect(result).toBe(5);
  });

  test('it should add two values', () => {
    const result = add(5, 2);
    expect(result).toBe(7);
  });

  test('it should multiply two values', () => {
    const result = mul(5, 2);
    expect(result).toBe(10);
  });

  test('it should return a function that return a given argument', ()=>{
    const result = givenArgument(2)(2);
    expect(result).toBe(2);
  });

  test('it should add from two invocations', () => {
    const result = addTwoInvocations(3)(4);
    expect(result).toBe(7)
  });

  test('it should make a binary callable with two invocations', () => {
    const result = applyFunc(mul)(5)(6);
    expect(result).toBe(30)
  });

  test('it should take a function and an argument, and returns a function that can supply a second argument', () => {
    const result = applyFuncArg(add, 2)(5);
    expect(result).toBe(7)
  });

  test('it should comvert a binary function to a method', ()=> {
    Number.prototype.add = methodize(add);
    const result = (3).add(4);
    expect(result).toBe();
  });
});

function identity(id) {
  return id;
}

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

function givenArgument(x) {
  return function () {
    return x;
  }
}

function addTwoInvocations(x) {
  return function (y) {
    return x + y;
  }
}

function applyFunc(binary) {
  return function (x) {
    return function (y) {
      return binary(x, y);
    }
  };
}

function applyFuncArg(func, x) {
  return applyFunc(func)(x);
}

function methodize(binary) {
  return function (x) {
    return binary(this, x);
  }
}