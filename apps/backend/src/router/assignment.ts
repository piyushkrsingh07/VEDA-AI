import { Router } from 'express'
import assignmentController from '../controllers/userAssignment.js'
import { upload } from '../middleware/multer.js'

const app:Router=Router()

app.post('/',upload.array("files",2),assignmentController.postAssignment)

export default app