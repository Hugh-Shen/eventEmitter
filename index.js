function EventEmitter() {
  this.events = {}
  this.maxListener = 8
}

EventEmitter.prototype.on = function(type, fn) {
  determineIfTheLimitIsExceeded(type)
  /**
   * 如果没有添加该事件的监听函数
   * 如果有值，放进队列里
   */
  if(this.events[type]) {
    this.events[type].push(fn)
  }else {
    this.events[type] = [fn]
  }
}

EventEmitter.prototype.emit = function(type, ...arg) {
  this.events[type] && this.events.forEach(item => item.apply(this, arg))
}

EventEmitter.prototype.once = function(type, fn) {
  let wrapper = (...arg) => {
    fn.apply(this, arg)
    this.removeListener(type, wrapper)
  }
  this.on(type, wrapper)
}

EventEmitter.prototype.removeListener = function(type, fn) {
  if(this.events[type]) {
    this.events[type] = this.events[type].filter(item => item != fn)
  }
}

EventEmitter.prototype.removeAllListener = function(type) {
  delete this.events[type]
}

EventEmitter.prototype.setMaxlistenet = function(quantity) {
  this.maxListener = quantity
}

EventEmitter.prototype.listeners = function(type) {
  return this.events[type]
}

let determineIfTheLimitIsExceeded = (type) => {
  let count = this.events[type].length
  if(this.maxListener != 0 && this.maxListener < count) {
    console.error(`可能会出现内存泄露。如果需要解除错误提示，请使用 setMaxlistener 来解除。
    当前设置的监听函数为${count}`)
  }
}

module.export = EventEmitter