import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    srno: {
        type: String,
    },
    name: {
        type: String,
    },
    aadharNo: {
        type: String,
    },
    game: {
        type: String,
    },
    ageGrp: {
        type: String,
    },
    position: {
        type: String,
    },
    state: {
        type: String,
    },
    tournamentName: {
        type: String,
    },
    organisedAt: {
        type: String,
    },
    venue: {
        type: String,
    },
})

const PlayerModel = mongoose.model("players",PlayerSchema)
export default PlayerModel;