import React, { useState, useRef } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GetData = () => {
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
  const [QrSrc, setQrSrc] = useState("")    //For Qr Code Image

  const [search, setSearch] = useState("")
  const [showData, setShowData] = useState(false)
  const [noData, setNoData] = useState(false)

  const ShowPlayerData = async () => {
    let response = await axios.get(`http://localhost:4000/getData/${search}`)
    response = response.data
    if (response) {
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
      setNoData(false)
      //For Qr Code Image
      setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/PlayerData/${search}`)
    }
    else {
      setShowData(false)
      setNoData(true)
    }
  }

  //This code is for pdf printing
  const formContainerRef = useRef(null);
  const GeneratePdf = () => {
    const formContainer = formContainerRef.current;
    html2canvas(formContainer)
      .then((canvas) => {
        html2canvas(formContainer).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a4');

          const pageWidth = pdf.internal.pageSize.width - 20;
          const pageHeight = pdf.internal.pageSize.height - 20;

          pdf.addImage(imgData, 'PNG', 10, 10, pageWidth, pageHeight);
          pdf.save('form.pdf');
        });
      })
  }


  return (
    <>
      <div className='searchPlayer'>
        <input autoFocus type="number" placeholder='Search Player by aadhar number' value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <button id="search" onClick={ShowPlayerData}>Search</button>
      </div>
      {
        showData && (
          <div id='container' ref={formContainerRef}>
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
              <div className="input-cont">
                <h3>Action</h3>
                <button onClick={(e) => { e.preventDefault(); GeneratePdf() }}>Download Pdf</button>
              </div>
            </form>

            {/* QR CODE IMAGE */}
            {/* <img src={QrSrc} alt="QR Code Not Loaded" /> */}
          </div>
        )
      }
      {
        noData && (
          <h1>No Data Available</h1>
        )
      }

    </>
  )
}

export default GetData