const {
	teamRoles,
	types,
	matchStates,
	teamSubmittedResults,
} = require("./consts")
const { Schema, model, ObjectId } = require("mongoose")

const tournamentSchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		show: { type: Boolean, required: true, default: false },
		startsOn: { type: Date, required: true },
		endsOn: { type: Date, required: true },
		game: { type: ObjectId, required: true, ref: "Games" },
		platform: { type: ObjectId, required: true, ref: "Platforms" },
		ruleset: { type: ObjectId, required: true, ref: "Rulesets" },
		type: { type: String, required: true, enum: types },
		createdBy: { type: ObjectId, required: true, ref: "Users" },
		imgUrl: { type: String, required: true },
		teams: [
			{
				name: { type: String, required: true },
				elo: { type: Number, required: true, default: 1500 },
				invites: [{}],
				members: [
					{
						role: {
							type: String,
							enum: teamRoles,
							required: true,
						},
						userId: { type: ObjectId, ref: "Users", required: true },
					},
				],
			},
		],
		matches: [
			{
				teamOne: { type: String, required: true },
				teamTwo: String,
				createdBy: { type: ObjectId, required: true, ref: "Users" },
				createdAt: { type: Date, required: true, default: Date.now() },
				acceptedAt: { type: Date },
				state: { type: String, enum: matchStates },
				teamOneResult: { type: String, enum: teamSubmittedResults },
				teamTwoResult: { type: String, enum: teamSubmittedResults },
			},
		],
	},
	{ timestamps: true }
)

const tournaments = model("Tournaments", tournamentSchema)

module.exports = tournaments
