import React,{useContext,useReducer,useRef} from "react";
/** useState使用
 *  返回值:一个state和更新这个state的函数
 *  初始化:state = useState(initState)
 *  setState:用于更新state,接受一个新的state值并将组件的一次重新渲染加入队列中，后续的重新渲染中，useState的第一个返回值为更新的state
 * */ 
// const Example = ({initState}) => {
//    const [count,setCount] = useState(initState);
//    return(
//      <>
//       Count:{count}
//       <button onClick={()=>setCount(initState)}>+Reset</button>
//       <button onClick={()=>setCount(count+1)}>+</button>
//       <button onClick={()=>setCount(count-1)}>-</button>
//      </>
//    )
// };
/** useEffect使用：接受一个包含命令式、且可能有副作用的函数
 *  在函数主体内(React渲染阶段)改变Dom、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的
 *  使用useEffect完成副作用操作。赋值给useEffect的函数会在组件渲染在屏幕后执行
 */
/** useContext
 * 
 */
const themes = {
  light: {
    color: "red",
    background: "blue"
  }
}
const ThemeContext = React.createContext(themes.light);
function OldFather(){
  return (
    <ThemeContext.Provider value={themes.light}>
      <Father></Father>
    </ThemeContext.Provider>
  )
}
function Father(){
  return (
    <div>
      <Kids></Kids>
    </div>
  )
}
function Kids(){
  const theme = useContext(ThemeContext)
  return (
    <div style={{background:theme.background,color:theme.color}}>
      我是使用useContext改变的背景和颜色
    </div>
  )
}
/**
 * useReducer
 */
// const initState = {
//   count:0,
//   a:1
// }
function init(initialCount){
  return {
    count:initialCount,
  }
}
function reducer(state,action){
  switch(action.type){
    case 'increment':
      return {
        count:state.count+1,
        // a:Math.random(),
      }
    case 'decrement':
        return {
          count:state.count-1,
          // a:Math.random(),
        }
    case 'reset':
        return init(action.payload);
    default:
      throw new Error()
  }
}
function UseReducerTest(){
  // const [state,dispatch] = useReducer(reducer,initState)
  const [state,dispatch] = useReducer(reducer,0,init)
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: 0})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <div>这是一个随机数:{state.a}</div>
    </>
  );
}
/** useRef
 * 
 */
function UseRefTest(){
  const inputRef = useRef(null);
  const onButtonClick = ()=>{
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} type="text" />
      <button  onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
export default UseRefTest;