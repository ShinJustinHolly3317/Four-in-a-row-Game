class Test {
  constructor () {
    console.log(this);
    this.obj = this.inheritThis()
  }

  inheritThis() {
    const newobj = new Test2(this)
    return newobj
  }
}

class Test2 {
  constructor(owner) {
    this.owner = owner
  }
}

class Test3 {
  constructor () {
    this.name = 'obj'
  }
}
const obj1 = new Test()
const obj2 = new Test3()
console.log(obj1.obj);
console.log(obj2);
console.log(Test3);