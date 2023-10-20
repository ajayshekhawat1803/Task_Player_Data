import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddData = () => {
    // const [srno, setSrno] = useState("")
    let srno;
    const [name, setName] = useState("")
    const [aadharNo, setAadharNo] = useState("")
    const [game, setGame] = useState("")
    const [ageGrp, setAgeGrp] = useState("")
    const [position, setPosition] = useState("")
    const [state, setState] = useState("")
    const [tournamentName, setTournamentName] = useState("")
    const [organisedAt, setOrganisedAt] = useState("")
    const [venue, setVenue] = useState("")
    const navigate = useNavigate()

    const handleAddData = async () => {
        //To Get the Number of Tounament in which player has achieved position
        let digit = tournamentName.split("")[0]
        digit = String(digit).padStart(2, "0")

        //To Get the Letter of level of Tournament in which player has achieved position
        let letter = tournamentName.split(" ")[1]
        letter = letter.charAt(0).toUpperCase()

        //To Get the last two digit of the year
        let year = new Date
        year = year.getFullYear().toString()
        year = year.split("")[2] + year.split("")[3]

        srno = `SGFI/${letter}${digit}/${year}/`
        // setSrno()  // srno in format SFGI/N/06/...
        const result = await axios.post("http://localhost:4000/addData", {
            srno, name, aadharNo, game, ageGrp, position, state, tournamentName, organisedAt, venue
        })
        if (result.data.name) {
            alert("Player Details Have been added")
            navigate("/getData")
        }
    }
    return (
        <>
            <h1>Add Player Data</h1>
            <div id="container">
                <form className="form-cont" onSubmit={(e) => { e.preventDefault(); handleAddData(); }}>
                    <div className="input-cont">
                        <label htmlFor="name">Player Name</label>
                        <input type="text" id='name' required autoFocus placeholder='Player Name' value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="aadhar">Aadhar Number</label>
                        <input type="number" id='name' required placeholder='Player Aadhar Number' value={aadharNo}
                            onChange={(e) => { setAadharNo(e.target.value) }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="game">Game</label>
                        <input type="text" id='game' required value={game} placeholder='Game'
                            onChange={(e) => { setGame(e.target.value) }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="ageGrp">Age Group</label>
                        <select value={ageGrp} required onChange={(e) => { setAgeGrp(e.target.value) }}>
                            <option value="">Not Selected</option>
                            <option value="SENIOR">SENIOR</option>
                            <option value="JUNIOR">JUNIOR</option>
                        </select>
                    </div>
                    <div className="input-cont">
                        <label htmlFor="position">Position</label>
                        <select value={position} required onChange={(e) => { setPosition(e.target.value) }} >
                            <option value="">Not Selected</option>
                            <option value="1ST GOLD">1ST GOLD</option>
                            <option value="2ND SILVER">2ND SILVER</option>
                            <option value="3RD BRONZE">3RD BRONZE</option>
                            <option value="Qualified">QUALIFIED</option>
                        </select>
                    </div>
                    <div className="input-cont">
                        <label htmlFor="state">State</label>
                        <input type="text" id='state' required value={state} placeholder='State'
                            onChange={(e) => { setState(e.target.value) }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="tournamentName">Tournament Name</label>
                        <input type="text" id='tournamentName' required value={tournamentName} placeholder='Tournament Name in ( NTh NATIONAL )'
                            onChange={(e) => { setTournamentName(e.target.value) }}
                            onBlur={() => { }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="organisedAt">Organised At</label>
                        <input type="text" id='organisedAt' required value={organisedAt} placeholder='Tournament Place'
                            onChange={(e) => { setOrganisedAt(e.target.value) }} />
                    </div>
                    <div className="input-cont">
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id='venue' required value={venue} placeholder='Venue of Tournament'
                            onChange={(e) => { setVenue(e.target.value) }} />
                    </div>
                    <input type="submit" value="Add Data" id='addDataBtn' />
                </form>
            </div>
        </>


    )
}

export default AddData
