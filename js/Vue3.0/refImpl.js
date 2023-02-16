class RefImpl{
  private _value
  public dep
  // 表示这是一个 Ref 类型的响应式数据
  private _v_isRef = true
  constructor(value) {
      this._value = value
      // 依赖存储
      this.dep = new Set()
  }
// getter 访问拦截
  get value() {
      // 依赖收集
      trackRefValue(this)
      return this._value
  }
// setter 设置拦截
  set value(newVal) {
      this._value = newVal
      // 触发依赖
      triggerEffect(this.dep)   
  }
}