import React, { useEffect } from "react";
import './App.css'
import Die from "./Components/die";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const[tenzies,setTenzies] = React.useState(false)
    useEffect(function(){
const allHeld=dice.every(die=>die.isHeld)
const firstValue=dice[0].value
const allValue=dice.every(die=>die.value===firstValue)
if(allHeld && allValue){
    console.log('You WOn')
    setTenzies(true)
}
},[dice])
    function allNewDice() {
        let randomArr = []
        for (let i = 0; i < 10; i++) {
            randomArr.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            })
        }

        return randomArr
    }
    function rollDice() {
        if(!tenzies){
            setDice(oldDie=>oldDie.map(die=>{
                return die.isHeld ? die: {
                    value: Math.floor(Math.random() * 6) + 1,
                    isHeld: false,
                    id: nanoid()
                }
            }))
        }
        else{
            setTenzies(false)
            setDice(allNewDice)
        }
    }
    function dieClick(id) {
        setDice(oldDie => oldDie.map(die => {
            return id === die.id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }
    const diceElement = dice.map(die => <Die key={die.id} value={die.value} held={die.isHeld} dieClick={() => dieClick(die.id)} />)
    return (
        <>
        {tenzies && <Confetti className="confetti"/>}
        <div className="appComponent">
              <h1 className="title">Tenzies Game</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dieSection'>

                {diceElement}
            </div>
            <button onClick={rollDice} className="button">{tenzies?"New Game":"Roll"}</button>
        </div>
        </>
    )
}