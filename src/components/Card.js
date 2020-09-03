import React, { useState } from 'react';

const Card = () => {

  const wrongColor = '#FF2E2E';
  const rightColor = '#008000';

  // card number is split up into four blocks
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [valid, setValid] = useState(wrongColor);

  const handleChange = (index, text) => {
    // check the text if it's valid
    if (text.length <= 4 && !/[^0-9]/.test(text)) {
      let newArr = [...cardNumber];
      newArr[index] = text;
      setCardNumber(newArr);

      // check if all 4 numbers are in
      if(newArr.findIndex(value => value.length !== 4) === -1){
        // dissect the number

        const number = newArr.join('');
        let sum = 0;
        for (let i = 0; i < number.length - 1; i++) {
          if (i % 2 === 1) 
            sum+= parseInt(number.charAt(i));
          else {
            let tmp = parseInt(number.charAt(i)) * 2;
            tmp < 10 ? sum += tmp : sum += tmp - 9;
          }
        }

        if ((sum * 9) % 10 === parseInt(number.charAt(number.length - 1))) {
          setValid(rightColor);
          return;
        }
      }
      setValid(wrongColor);
    }
  }

  return(
    <div className="box inactive" style={{ border: `3px solid ${valid}` }}>

      <input value={cardNumber[0]} onChange={(e) => handleChange(0, e.target.value)}></input>
      <input value={cardNumber[1]} onChange={(e) => handleChange(1, e.target.value)}></input>
      <input value={cardNumber[2]} onChange={(e) => handleChange(2, e.target.value)}></input>
      <input value={cardNumber[3]} onChange={(e) => handleChange(3, e.target.value)}></input>

    </div>
  )

}

export default Card;