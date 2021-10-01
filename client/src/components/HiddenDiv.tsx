import {JSXElement} from '@babel/types'
import React from 'react'

interface IHiddenDiv {
  w:number;
}

const HiddenDiv = ({w}:IHiddenDiv )=> {
  return(
    <div className={`pr-${w} invisible`}>
      &nbsp;
    </div>
)
}

export default HiddenDiv

