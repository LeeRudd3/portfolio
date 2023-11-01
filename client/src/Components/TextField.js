import React, { Component } from 'react';

export default function TextField({ title, placeHolder, name, inputValue, handleInputChange, validate, error }) {

  return (
    <div>
        <table className='add'>
            <tbody className='add'>
            <tr className='add'>
                <td className='add'>
                <p>{title}</p>
                </td>
                <td className='add'>
                <input
                    type="text"
                    className="textbox"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeHolder}
                    name={name}
                />
                </td>
            </tr>
            {validate && (
                <tr className='add'>
                <td className='add'> 
                    <p className='validationText'>{error}</p>
                </td>
                </tr>
            )}
                
            </tbody>
        </table>
    </div>
  );
};