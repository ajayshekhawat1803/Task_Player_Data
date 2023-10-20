import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlayerData = () => {
    const [search, setSearch] = useState("")
    const [showData, setShowData] = useState(false)
    const [srno, setSrno] = useState("")
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

    useEffect(() => {
        setSearch(window.location.href.split("/")[4])
    }, [])
    useEffect(() => {
        getPlayerData()
    }, [search])

    const getPlayerData = async () => {
        let response = await axios.get(`http://localhost:4000/getData/${search}`)
        response = response.data
        if (response.name) {
            setSrno(response.srno)
            setName(response.name)
            setAadharNo(response.aadharNo)
            setGame(response.game)
            setAgeGrp(response.ageGrp)
            setPosition(response.position)
            setState(response.state)
            setTournamentName(response.tournamentName)
            setOrganisedAt(response.organisedAt)
            setVenue(response.venue)
            setShowData(true)
        } else {
            setShowData(false)
        }
    }

    const ShowPlayerData = () => {
        navigate("/getData")
    }
    return (
        <>
            <div className='searchPlayer'>
                <input autoFocus type="number" disabled placeholder='Search Player by aadhar number' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button id="search" onClick={ShowPlayerData}>Search Another</button>
            </div>

            {
                showData && (<div id='container'>
                    <div className="form-cont">
                        <div className="input-cont">
                            <label htmlFor="srno">Serial No.</label>
                            <input disabled type="text" id='srno' value={srno} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="name">Player Name</label>
                            <input disabled type="text" id='name' value={name} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="aadhar">Aadhar Number</label>
                            <input disabled type="number" id='name' value={aadharNo} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="game">Game</label>
                            <input disabled type="text" id='game' value={game} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="ageGrp">Age Group</label>
                            <input disabled value={ageGrp} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="position">Position</label>
                            <input disabled value={position} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="state">State</label>
                            <input disabled type="text" id='state' value={state} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="tournamentName">Tournament Name</label>
                            <input disabled type="text" id='tournamentName' value={tournamentName} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="organisedAt">Organised At</label>
                            <input disabled type="text" id='organisedAt' value={organisedAt} />
                        </div>
                        <div className="input-cont">
                            <label htmlFor="venue">Venue</label>
                            <input disabled type="text" id='venue' value={venue} />
                        </div>
                        {/* <div className="input-cont">
                            <label htmlFor="action">Action</label>
                            <a href="#">Download Pdf</a>
                        </div> */}
                    </div>
                </div>)
            }
        </>
    )
}

export default PlayerData
