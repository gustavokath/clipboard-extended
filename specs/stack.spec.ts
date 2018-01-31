import { expect } from 'chai'
import { Stack } from '../src/stack'
import 'mocha'

describe('isEmpty()', () => {
  it('should return true', () => {
    const emptyStack = new Stack()
    expect(emptyStack.isEmpty()).to.equal(true);
  })

  it('should return false', () => {
    const stack = new Stack()
    stack.stack = ['foo']
    expect(stack.isEmpty()).to.equal(false);
  })
});

describe('get(index)', () => {
  it('should return second item', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'bah']
    expect(stack.get(1)).to.equal('bah');
  })

  it('should return undefinded', () => {
    const emptyStack = new Stack()
    expect(emptyStack.get(0)).to.equal(undefined);
  })

  it('should return first item', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'bah']
    expect(stack.get(0)).to.equal('foo');
  })
});

describe('getTop()', () => {
  it('should return bah', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'bah']
    expect(stack.getTop()).to.equal('bah');
  })

  it('should return null', () => {
    const emptyStack = new Stack()
    expect(emptyStack.getTop()).to.equal(null);
  })
});

describe('push(string)', () => {
  it('should have stack with new item', () => {
    const emptyStack = new Stack()
    emptyStack.push('foo')
    expect(emptyStack.stack).to.deep.equals(['foo']);
  })

  it('should have stack with 1 item', () => {
    const stack = new Stack()
    stack.push('foo')
    stack.push('foo')
    expect(stack.stack).to.deep.equals(['foo']);
  })

  it('should have stack with 2 items', () => {
    const stack = new Stack()
    stack.push('foo')
    stack.push('bah')
    expect(stack.stack).to.deep.equals(['foo', 'bah']);
  })
});

describe('pop()', () => {
  it('should return removed item', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'tah', 'bah']
    expect(stack.pop()).to.equal('bah');
  })

  it('should have 2 items in stack', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'tah', 'bah']
    stack.pop()
    expect(stack.stack).to.deep.equal(['foo', 'tah']);
  })

  it('should "tah" as first', () => {
    const stack = new Stack()
    stack.stack = ['foo', 'tah', 'bah']
    stack.pop()
    expect(stack.first).to.equal('tah');
  })

  it('should return null', () => {
    const emptyStack = new Stack()
    expect(emptyStack.pop()).to.equal(null);
  })
});

describe('clear()', () => {
  it('has an empty stack', () => {
    const stack = new Stack()
    stack.push('foo')
    stack.clear()
    expect(stack.stack).to.deep.equal([])
  })

  it('has an null first', () => {
    const stack = new Stack()
    stack.push('foo')
    stack.clear()
    expect(stack.first).to.equal(null)
  })
});


