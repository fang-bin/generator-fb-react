import React, { useState, useEffect } from 'react';
const App = () => {
  const [txt, setTxt] = useState('');
  useEffect(() => {
    setTxt('wellcome');
  }, []);
  return <div>{txt}</div>;
}
export default App;