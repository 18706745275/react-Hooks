# react-Hooks
react-Hooks项目实战，一个简单的电影包含搜索实际例子
# Hooks Api总结
* 常用Hooks
~~~
1.useState
  返回一个数组:state、更新state的方法
  const [state, setState] = useState(initialState);
  setState接收当前的state作为参数
  它不是把新的state和旧的state合并，而是直接替换
  优化：
    1.Hook内部使用Object.is来比较新旧state
    2.与class组件的setSate方法不同，如果修改状态但是值没有改变时不会重新渲染
    3.与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果
2.useEffect
  数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
  useEffect 接收一个函数，该函数会在组件渲染到屏幕之后才执行。
  该函数有要求：要么返回一个能清除副作用的函数，要么就不返回任何内容
  useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
3.useReducer
  它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法
4.useContext
  接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
  当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
  useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
~~~
* 其他优化方向等
~~~
1.useCallback
  接收一个内联回调函数和一个依赖项组件(子组件用到的父组件的state),useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
2.useMemo
  把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
~~~
