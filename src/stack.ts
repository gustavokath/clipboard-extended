export class Stack {
  stack: string[]
  first: string

  constructor(){
    this.stack = []
    this.first = null
  }

  public get(index: number): string{
    if(index >= this.stack.length){
      return undefined
    }

    return this.stack[index]
  }

  public getTop(): string{
    const size: number = this.stack.length
    if(size == 0) return null
    return this.stack[size-1]
  }

  public push(value: string){
    if(this.first != value){
      this.stack.push(value)
      this.first = value
    }
  }

  public pop(): string{
    if(this.isEmpty()) return null

    const removed: string = this.stack.pop()
    this.first = this.getTop()
    return removed
  }

  public isEmpty(): boolean{
    return this.stack.length == 0
  }
}