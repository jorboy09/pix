//#region imports below
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import grant from 'grant'
import Knex from 'knex'
import jwtSimple from 'jwt-simple';
import { Bearer } from 'permit'
import { FanListController } from './controllers/fanlist.controller'
import { FanListService } from './services/fanlist.service'
import { Routes, routes } from './routes';
import { ProductService } from './services/productService'
import { ProductController } from './controllers/productController'
import LoginController from './controllers/LoginController'
import LoginService from './services/LoginService'
import RegisterController from './controllers/RegisterController'
import RegisterService from './services/RegisterService'
import { CalendarService } from './services/calendar.service'
import { CalendarController } from './controllers/calendar.controller'
import { ContactService } from './services/contactService'
import { ContactController } from './controllers/contactController'
import AddPostController from './controllers/AddPostController'
import AddPostService from './services/AddPostService'
import UpdateController from './controllers/updateController'
import UpdateService from './services/updateService'
import http from 'http';
import SocketIO from 'socket.io'
import { BoardService } from './services/board.service'
import { BoardController } from './controllers/board.controller'
import { FanzoneService } from './services/fanzoneService'
import { FanzoneController } from './controllers/fanzoneController'
import { InboxController } from './controllers/inboxController'
import { InboxService } from './services/inboxService'
import { ConnectionService } from './services/connection.service'
import { ConnectionController } from './controllers/connection.Controller'

// S3 bucket packages
// import aws from 'aws-sdk'
// import multerS3 from 'multer-s3'

//#endregion import above

//#region configs below

dotenv.config();
const knexConfig = require('./knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

//#endregion configs above

//#region multer storage below 

//S3 Config
// const spacesEndpoint = new aws.Endpoint(process.env.S3_ENDPOINT!);

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   endpoint: spacesEndpoint,
// });

// const customBoard = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`creator_img/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
//   })


// const product = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`product_img/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
// })

// const creatorImgProf = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`creator_img/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
//   })
// const creatorImg = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`creator_img/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
//   })
// const creatorVid = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`creator_video/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
//   })
// const creatorAud = multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME!,
//       acl: 'public-read',
//       metadata: (req,file,cb)=>{
//           cb(null,{fieldName: file.fieldname});
//       },
//       key: (req,file,cb)=>{
//           cb(null,`creator_audio/${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//       }
//   })
const customBoard = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/creator_img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})

const product = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/product_img/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})


const creatorImgProf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/creator_img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})


const creatorImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/creator_img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})


const creatorVid = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/creator_video`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})


const creatorAud = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../my-app/public/creator_audio`);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})

export const customBoardUpload = multer({ storage: customBoard })
export const productUpload = multer({ storage: product })

export const creatorImgUpload = multer({ storage: creatorImg })
export const creatorImgProfUpload = multer({ storage: creatorImgProf })
export const creatorVidUpload = multer({ storage: creatorVid })
export const creatorAudUpload = multer({ storage: creatorAud })

//#endregion multer storage above 

//#region express & socket

const app = express();
const server = http.createServer(app);
const io = new SocketIO.Server(server, {
  cors: {
    origin: [process.env.REACT_HOST!],
  }
})

//#endregion

//#region Services

const fanListService = new FanListService(knex)
const productService = new ProductService(knex)
const loginService = new LoginService(knex);
const calendarService = new CalendarService(knex)
const registerService = new RegisterService(knex)
const boardService = new BoardService(knex)
const contactService = new ContactService(knex)
const fanzoneService = new FanzoneService(knex)
const addPostService = new AddPostService(knex)
const updateService = new UpdateService(knex)
const inboxService = new InboxService(knex)
const connectionservice = new ConnectionService(knex)


//#endregion 

//#region Controllers

export const fanListController = new FanListController(fanListService)
export const productController = new ProductController(productService)
export const loginController = new LoginController(loginService);
export const calendarController = new CalendarController(calendarService)
export const contactController = new ContactController(contactService)
export const registerController = new RegisterController(registerService, io)
export const boardcontroller = new BoardController(boardService)
export const fanzoneController = new FanzoneController(fanzoneService, io)
export const addPostController = new AddPostController(addPostService)
export const updateController = new UpdateController(updateService)
export const inboxController = new InboxController(inboxService, io)
export const connectionController = new ConnectionController(connectionservice)


//#endregion

declare global {
  namespace Express {
    interface Request {
      user?
    }
  }
}

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", routes)
app.use('images', express.static('../my-app/src/creator_img'))
app.use('videos', express.static('../my-app/src/creator_video'))
app.use('audios', express.static('../my-app/src/creator_audio'))

const permit = new Bearer({
  query: 'access_token'
})

export const isLoggedIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  const token = permit.check(req)
  try {
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }
    const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)

    const user = await knex.select('*').from('fans').where('id', payload.id)

    if (user[0]) {
      req['user'] = user[0];
      return next()
    } else {
      res.status(401).json({ 'result': 'Unauthorized' })
    }
  } catch (e) {
    res.status(401).json({ 'result': 'Unauthorized' })
  }
}

export const isCreator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  const token = permit.check(req);
  try {
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }
    const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)
    if (payload.isCreator) {
      return next();
    } else {
      res.status(401).json({ 'result': 'Unauthorized' })
    }
  } catch (e) {
    res.status(401).json({ 'result': 'Unauthorized' })
  }
}

export const isCreatorFRD = async (
  req: express.Request,
  res: express.Response
) => {
  const token = permit.check(req);
  try {
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }
    const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)
    res.json(payload)
  } catch (e) {
    res.status(401).json({ 'result': 'isCreatorFRD' })
  }
}

Routes.Initialize();

const port = process.env.port || 8080

server.listen(port, () => {
  console.log('Listening on port ' + port)
})