const { Schema, model, ObjectId } = require("mongoose")

const messagesSchema = new Schema(
	{
		message: { type: String, required: true },
		userId: { type: ObjectId, required: true, ref: "Users" },
		date: { type: Date, required: true, default: Date.now() },
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
)

const ticketsSchema = new Schema(
	{
		subject: { type: String, unique: false, required: true },
		date: { type: Date, required: true, default: Date.now() },
		category: { type: String, required: true },
		matchId: { type: ObjectId, required: false, ref: "Matches" },
		tournamentId: { type: ObjectId, required: false, ref: "Tournaments" },
		attachments: { type: Array, required: true },
		status: { type: String, required: true, default: "NEW" },
		userId: { type: ObjectId, required: true, ref: "Users" },
		messages: [messagesSchema],
	},
	{ timestamps: true }
)

const tickets = model("Tickets", ticketsSchema)

module.exports = tickets