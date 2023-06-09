
import './App.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [login, setLogin] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgA, setMsgA] = useState('');

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  function handleGenerate() {
    setMsgA('');
    const data = { user: user, password: password };
    console.log(data);
    fetch('https://coupon-sable.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const msg = responseJson.msg;
        setMsg(msg)
        console.log(responseJson);
        const code = responseJson.code;
        if (msg == 1) {
          setLogin(true);
          setCode(code);

        }
        else {
          setLogin(false);
          setCode(-1);
        }


      })
      .catch((error) => {
        // Handle any error that occurred during the fetch
        console.error(error);
      });

  };
  function handleApply() {
    const data = { user: user, password: password, code: code };
    console.log(data);
    fetch('https://coupon-sable.vercel.app/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMsgA(responseJson.msg);
        setMsg('')
        if (responseJson.msg == -1) {
          setCode(-1);
          setLogin(false);
        }



      })
      .catch((error) => {
        // Handle any error that occurred during the fetch
        console.error(error);
      });

  }
  const handleCopyText = () => {
    const textToCopy = code;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard:', textToCopy);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };

  return (
    <div >
    <p className='heading' >Coupon Code</p>
      <div style={{flexDirection:'column',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'space-around'}}>
      <div style={{margin:'5px'}}>
         <input type='text' style={{width:'300px'}} value={user} onChange={handleUser} placeholder='Type your user name' />
      </div>
     
      <div style={{margin:'5px'}}>
      <input type='text' style={{width:'300px'}}  value={password} onChange={handlePassword} placeholder='Type your password' /></div>
  
      <button className='button33' onClick={handleGenerate}>Generate</button>
      {(msg == -1 && code == -1) && <div>Check your password or username</div>}
      {(msgA == -1) && <div>Generate again</div>}
      </div>
      
      
      <div style={{display:'flex',alignItems:'center',alignContent:'center',flexDirection:'column',justifyContent:'space-evenly',height:'300px'}}>
      {(login && msg) && <div style={{width:'100px',textAlign:'center'}}  className='cpnCode'><span onClick={handleCopyText}>{code}</span></div>}
      
      {(code != -1 && msg != -1 && msg!='') && <div ><button className='button-24' onClick={handleApply}>Apply Code</button></div>}
      
      {(msgA == 1) && <div>Applied successfully</div>}
      </div>



    </div>
  );
}

export default App;
