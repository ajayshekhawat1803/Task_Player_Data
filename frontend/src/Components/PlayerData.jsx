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
                    <form className="form-cont" >
                        <div className="input-cont">
                            <h3>Serial No.</h3>
                            <h2>{srno}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Player Name</h3>
                            <h2>{name}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Aadhar Number</h3>
                            <h2>{aadharNo}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Game</h3>
                            <h2>{game}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Age Group</h3>
                            <h2>{ageGrp}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Position</h3>
                            <h2>{position}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>State</h3>
                            <h2>{state}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Tournament Name</h3>
                            <h2>{tournamentName}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Organised At</h3>
                            <h2>{organisedAt}</h2>
                        </div>
                        <div className="input-cont">
                            <h3>Venue</h3>
                            <h2>{venue}</h2>
                        </div>
                    </form>
                </div>)
            }
        </>
    )
}

export default PlayerData
