// useContext实际例子
import React,{ useContext,useState } from 'react';

const MoneyContext = React.createContext();
// 爷爷组件
export default function Old(){
    const [ money,setMoney ] = useState(1000);
    return (
       <MoneyContext.Provider value={money}>
           <>
              <p>我给了我孙子留了{money},让我儿子给我孙子</p>
              <button onClick={()=>setMoney(money-10)}>
                买包烟
              </button>
              <hr/>
              <Father/>
           </>
       </MoneyContext.Provider> 
    )
}
// 父亲组件
function Father(){
    const money = useContext(MoneyContext);
    return (
          <>
            <p>我是儿子，我爸给我{money}元，给我儿子</p>
            <hr/>
            <Son />
          </>
          
      );
}
function Son(){
  const money = useContext(MoneyContext);
  return (
    <>
      <div>我是孙子，我爸说我爷爷给我{money}元</div>
    </>
  );
}
