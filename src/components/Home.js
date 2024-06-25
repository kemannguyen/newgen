import React, { useEffect } from 'react'
import '../style/Home.css';
import ngicon from '../images/ngicon.png'
import menu from '../images/menu-icon1.png'

const Home = () => {
  let counter;
  useEffect(()=>{
    counter = 1;
  },[])
  
  setInterval(() => {
    try{
      if(counter === 1){
        document.getElementById('radio1').checked = true;
        document.getElementById('radio2').checked = false;
        document.getElementById('radio3').checked = false;
        document.getElementById('radio4').checked = false;
      }
      else if(counter === 2)
      {
        document.getElementById('radio1').checked = false;
        document.getElementById('radio2').checked = true;
        document.getElementById('radio3').checked = false;
        document.getElementById('radio4').checked = false;
      }
      else if(counter === 3){
        document.getElementById('radio1').checked = false;
        document.getElementById('radio2').checked = false;
        document.getElementById('radio3').checked = true;
        document.getElementById('radio4').checked = false;
      }
      else if(counter === 4){
        document.getElementById('radio1').checked = false;
        document.getElementById('radio2').checked = false;
        document.getElementById('radio3').checked = false;
        document.getElementById('radio4').checked = true;
      }
      
    }
    catch{
      ;
    }
    counter++;
    if(counter > 4){
      counter = 1;
    }
  }, 5000);

  const C1 = () =>{
    document.getElementById('radio1').checked = true;
    document.getElementById('radio2').checked = false;
    document.getElementById('radio3').checked = false;
    document.getElementById('radio4').checked = false;
    counter = 1;
  }
  const C2 = () =>{
    document.getElementById('radio1').checked = false;
    document.getElementById('radio2').checked = true;
    document.getElementById('radio3').checked = false;
    document.getElementById('radio4').checked = false;
    counter = 2;
  }
  const C3 = () =>{
    document.getElementById('radio1').checked = false;
    document.getElementById('radio2').checked = false;
    document.getElementById('radio3').checked = true;
    document.getElementById('radio4').checked = false;
    counter = 3;
  }
  const C4 = () =>{
    document.getElementById('radio1').checked = false;
    document.getElementById('radio2').checked = false;
    document.getElementById('radio3').checked = false;
    document.getElementById('radio4').checked = true;
    counter = 4;
  }
  return (
    <div className='margins'>
    <div className='slider'>

      <div className='slides'>
        <input type='radio' name='radio-btn' id='radio1'/>
        <input type='radio' name='radio-btn' id='radio2'/>
        <input type='radio' name='radio-btn' id='radio3'/>
        <input type='radio' name='radio-btn' id='radio4'/>
        
        <div className='slide first'>
          <img src={ngicon} alt=''/>
        </div>
        <div className='slide'>
          <img src={menu} alt=''/>
        </div>
        <div className='slide'>
          <img src={ngicon} alt=''/>
        </div>
        <div className='slide'>
          <img src={ngicon} alt=''/>
        </div>

        <div className='navigation-auto'>
          <div className='auto-btn-1'></div>
          <div className='auto-btn-2'></div>
          <div className='auto-btn-3'></div>
          <div className='auto-btn-4'></div>
        </div>

        <div className='navigation-manual'>
          <label for='radio1' className='manual-btn' onClick={C1}></label>
          <label for='radio2' className='manual-btn' onClick={C2}></label>
          <label for='radio3' className='manual-btn' onClick={C3}></label>
          <label for='radio4' className='manual-btn' onClick={C4}></label>          
        </div>

      </div>
    </div>
    <div> HELLO about the company text section here </div>
    <div>Another color background with small pic animate when scrolling to it "fade in" and more text here</div>
    </div>
  )
}

export default Home