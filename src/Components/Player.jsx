import { useState } from 'react'
export default function Player({ intialName, symbol, isActive, handlePlayerName }) {

    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(intialName)

    const handleEdit = () => {
        setIsEditing(editing => !editing)

        if (isEditing) {
            handlePlayerName(symbol, playerName)
        }
    }
    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }
    return (
        <li className={isActive ? "active" : undefined} >

            {isEditing ?
                <input type="text" value={playerName} onChange={handleChange} />
                :
                <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li >

    )
}