const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(
	`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/test-db?authSource=admin`
)
mongoose.connection.on('error', (err) => console.error(err))
mongoose.connection.once('open', () => console.log('db connected'))

const Notes = mongoose.model(
	'Notes',
	new mongoose.Schema(
		{
			note: {
				type: String,
				requried: true,
			},
		},
		{
			timestamps: true,
		}
	)
)

app.use(cors({ origin: '*' }))

app.get('/notes', async (req, res) => {
	result = await Notes.find().sort({ createdAt: -1 }).limit(5)
	res.json(result)
	// console.log(result)
	// return res.json([
	// 	{ note: 'test note hard coded' },
	// 	{ note: 'test hard code 2' },
	// ])
})

app.post('/notes', async (req, res) => {
	if (!req.body.note) {
		return res.status(400).json({ error: 'No note provided.' })
	} else {
		result = await new Notes(req.body).save()
		res.json(result)
	}
})

app.get('/', (req, res) => {
	return res.json({ message: 'Connected to Backend' })
})

app.listen(3001, () => console.log('server running 3001'))
