import React from 'react'

const chars = ['a1.mp3', 'a2.mp3', 'a3.mp3', 'a4.mp3', 'am1.mp3', 'am2.mp3', 'am3.mp3', 'b1.mp3', 'b2.mp3', 'b3.mp3', 'c1.mp3',
 'c2.mp3', 'c3.mp3', 'cm1.mp3', 'cm2.mp3', 'cm3.mp3', 'd1.mp3', 'd2.mp3', 'd3.mp3', 'dm1.mp3', 'dm2.mp3', 'dm3.mp3', 'e1.mp3',
  'e2.mp3', 'e3.mp3', 'e4.mp3', 'f1.mp3', 'f2.mp3', 'f3.mp3', 'f4.mp3', 'fm1.mp3', 'fm2.mp3', 'fm3.mp3', 'fm4.mp3', 'g1.mp3',
   'g2.mp3', 'g3.mp3', 'g4.mp3', 'g4.ogg', 'gm1.mp3', 'gm2.mp3', 'gm3.mp3', 'gm4.mp3']

export default () => (
    <div>
        {
            chars.map((char) => (
                <audio id={char.replace('.mp3', '')} key={char} preload="true">
                    <source src={`recordings/regular/${char}`} type="audio/mp3"></source>    
                </audio>
            ))
        }
    </div>
)