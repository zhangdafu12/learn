import {
  ref,
  effect,
  reactive,
  isRef,
  toRef,
  toRefs,
  Ref,
  isReactive
} from '../src/index'
import { computed } from '@vue/runtime-dom'
import { shallowRef, unref, customRef, triggerRef } from '../src/ref'

describe('reactivity/ref', () => {
  // 返回值是一个带有 value 对象, 并且是可以响应的
  it('should hold a value', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
    a.value = 2
    expect(a.value).toBe(2)
  })

  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // same value should not trigger
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })
// 嵌套的属性可以响应
  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })
// 传递空值也可以响应
  it('should work without initial value', () => {
    const a = ref()
    let dummy
    effect(() => {
      dummy = a.value
    })
    expect(dummy).toBe(undefined)
    a.value = 2
    expect(dummy).toBe(2)
  })

  // ref 在 reactive 中会被转换成原始值，而非 ref
  it('should work like a normal property when nested in a reactive object', () => {
    const a = ref(1)
    const obj = reactive({
      a,
      b: {
        c: a
      }
    })

    let dummy1: number
    let dummy2: number

    effect(() => {
      dummy1 = obj.a
      dummy2 = obj.b.c
    })

    const assertDummiesEqualTo = (val: number) =>
      [dummy1, dummy2].forEach(dummy => expect(dummy).toBe(val))

    assertDummiesEqualTo(1)
    a.value++
    assertDummiesEqualTo(2)
    obj.a++
    assertDummiesEqualTo(3)
    obj.b.c++
    assertDummiesEqualTo(4)
  })

  // ref 嵌套时会自动 unwrap, 访问 b.value 相当于 b.value.value
  it('should unwrap nested ref in types', () => {
    const a = ref(0)
    const b = ref(a)

    expect(typeof (b.value + 1)).toBe('number')
  })

  it('should unwrap nested values in types', () => {
    const a = {
      b: ref(0)
    }

    const c = ref(a)

    expect(typeof (c.value.b + 1)).toBe('number')
  })
// 不应解开嵌套在数组内的引用类型
  it('should NOT unwrap ref types nested inside arrays', () => {
    const arr = ref([1, ref(3)]).value
    expect(isRef(arr[0])).toBe(false)
    expect(isRef(arr[1])).toBe(true)
    expect((arr[1] as Ref).value).toBe(3)
  })
// 应该解开引用类型作为数组的支持
  it('should unwrap ref types as props of arrays', () => {
    const arr = [ref(0)]
    const symbolKey = Symbol('')
    arr['' as any] = ref(1)
    arr[symbolKey as any] = ref(2)
    const arrRef = ref(arr).value
    expect(isRef(arrRef[0])).toBe(true)
    expect(isRef(arrRef['' as any])).toBe(false)
    expect(isRef(arrRef[symbolKey as any])).toBe(false)
    expect(arrRef['' as any]).toBe(1)
    expect(arrRef[symbolKey as any]).toBe(2)
  })


  // 会检测传递 ref 的值类型 ，如果是引用类型就 reactive ，不是直接返回结果
  it('should keep tuple types', () => {
    const tuple: [number, string, { a: number }, () => number, Ref<number>] = [
      0,
      '1',
      { a: 1 },
      () => 0,
      ref(0)
    ]
    const tupleRef = ref(tuple)

    tupleRef.value[0]++
    expect(tupleRef.value[0]).toBe(1)
    tupleRef.value[1] += '1'
    expect(tupleRef.value[1]).toBe('11')
    tupleRef.value[2].a++
    expect(tupleRef.value[2].a).toBe(2)
    expect(tupleRef.value[3]()).toBe(0)
    tupleRef.value[4].value++
    expect(tupleRef.value[4].value).toBe(1)
  })

  it('should keep symbols', () => {
    const customSymbol = Symbol()
    const obj = {
      [Symbol.asyncIterator]: { a: 1 },
      [Symbol.unscopables]: { b: '1' },
      [customSymbol]: { c: [1, 2, 3] }
    }

    const objRef = ref(obj)

    expect(objRef.value[Symbol.asyncIterator]).toBe(obj[Symbol.asyncIterator])
    expect(objRef.value[Symbol.unscopables]).toBe(obj[Symbol.unscopables])
    expect(objRef.value[customSymbol]).toStrictEqual(obj[customSymbol])
  })

  // unref 可以将 ref 还原成原始值
  test('unref', () => {
    expect(unref(1)).toBe(1)
    expect(unref(ref(1))).toBe(1)
  })


  // shallowRef 不会发生响应，替换掉整个对象会触发响应
  test('shallowRef', () => {
    const sref = shallowRef({ a: 1 })
    expect(isReactive(sref.value)).toBe(false)

    let dummy
    effect(() => {
      dummy = sref.value.a
    })
    expect(dummy).toBe(1)

    sref.value = { a: 2 }
    expect(isReactive(sref.value)).toBe(false)
    expect(dummy).toBe(2)
  })

  test('shallowRef force trigger', () => {
    const sref = shallowRef({ a: 1 })
    let dummy
    // ref 发生改变会触发effect()
    effect(() => {
      dummy = sref.value.a
    })
    expect(dummy).toBe(1)

    sref.value.a = 2
    expect(dummy).toBe(1) // should not trigger yet

    // force trigger
    // 强制触发更新
    triggerRef(sref)
    expect(dummy).toBe(2)
  })

  test('isRef', () => {
    expect(isRef(ref(1))).toBe(true)
    expect(isRef(computed(() => 1))).toBe(true)

    expect(isRef(0)).toBe(false)
    expect(isRef(1)).toBe(false)
    // an object that looks like a ref isn't necessarily a ref
    expect(isRef({ value: 0 })).toBe(false)
  })

  test('toRef', () => {
    const a = reactive({
      x: 1
    })
    const x = toRef(a, 'x')
    expect(isRef(x)).toBe(true)
    expect(x.value).toBe(1)

    // source -> proxy
    a.x = 2
    expect(x.value).toBe(2)

    // proxy -> source
    x.value = 3
    expect(a.x).toBe(3)

    // reactivity
    let dummyX
    effect(() => {
      dummyX = x.value
    })
    expect(dummyX).toBe(x.value)

    // mutating source should trigger effect using the proxy refs
    a.x = 4
    expect(dummyX).toBe(4)

    // should keep ref
    const r = { x: ref(1) }
    expect(toRef(r, 'x')).toBe(r.x)
  })

  test('toRefs', () => {
    const a = reactive({
      x: 1,
      y: 2
    })

    const { x, y } = toRefs(a)

    expect(isRef(x)).toBe(true)
    expect(isRef(y)).toBe(true)
    expect(x.value).toBe(1)
    expect(y.value).toBe(2)

    // source -> proxy
    a.x = 2
    a.y = 3
    expect(x.value).toBe(2)
    expect(y.value).toBe(3)

    // proxy -> source
    x.value = 3
    y.value = 4
    expect(a.x).toBe(3)
    expect(a.y).toBe(4)

    // reactivity
    let dummyX, dummyY
    effect(() => {
      dummyX = x.value
      dummyY = y.value
    })
    expect(dummyX).toBe(x.value)
    expect(dummyY).toBe(y.value)

    // mutating source should trigger effect using the proxy refs
    a.x = 4
    a.y = 5
    expect(dummyX).toBe(4)
    expect(dummyY).toBe(5)
  })
//toRefs应该对普通对象发出警告
  test('toRefs should warn on plain object', () => {
    toRefs({})
    expect(`toRefs() expects a reactive object`).toHaveBeenWarned()
  })
//toRefs应该对普通数组发出警告
  test('toRefs should warn on plain array', () => {
    toRefs([])
    expect(`toRefs() expects a reactive object`).toHaveBeenWarned()
  })

  test('toRefs reactive array', () => {
    const arr = reactive(['a', 'b', 'c'])
    const refs = toRefs(arr)
    expect(Array.isArray(refs)).toBe(true)

    refs[0].value = '1'
    expect(arr[0]).toBe('1')

    arr[1] = '2'
    expect(refs[1].value).toBe('2')
  })
// 支持自定义 ref, 自由控制 track, trigger 时间
  test('customRef', () => {
    let value = 1
    let _trigger: () => void

    const custom = customRef((track, trigger) => ({
      get() {
        track()
        return value
      },
      set(newValue: number) {
        value = newValue
        _trigger = trigger
      }
    }))

    expect(isRef(custom)).toBe(true)

    let dummy
    effect(() => {
      dummy = custom.value
    })
    expect(dummy).toBe(1)

    custom.value = 2
    // should not trigger yet
    expect(dummy).toBe(1)

    _trigger!()
    expect(dummy).toBe(2)
  })
})
