import cors from "cors";
import express from "express";
import * as Knex from "knex";
import {
    fanListController,
    productController,
    calendarController,
    loginController,
    registerController,
    isLoggedIn,
    isCreator,
    isCreatorFRD,
    boardcontroller,
    customBoardUpload,
    contactController,
    productUpload,
    creatorImgProfUpload,
    creatorImgUpload,
    creatorVidUpload,
    creatorAudUpload,
    addPostController,
    fanzoneController,
    updateController,
    inboxController,
    connectionController
} from './main';

export const routes = express.Router();

const corsReactOptions = {
    origin: [process.env.REACT_HOST!]
}

const corsReferenceOptions = {
    origin: [process.env.REFERENCE_HOST!]
}

let knex: Knex;

let corsOtherOptions = {
    origin: async function (origin, callback) {
        let result = await knex.select('*').from('domains').where('api', '=', origin)
        if (result.length !== 0) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
export class Routes {
    public static Initialize() {

        //#region Fan management controller

        routes.post('/fanList', cors(corsReactOptions), fanListController.getFanList)
        routes.put('/superfan', cors(corsReactOptions), fanListController.setSuperFan)
        routes.delete('/banfan', cors(corsReactOptions), fanListController.banFan)

        //#endregion

        //#region Fanzone controller

        routes.get('/fanszone', cors(corsReactOptions), fanzoneController.getFanzone)
        routes.post('/fanszone', cors(corsReactOptions), fanzoneController.postFanzone)

        //#endregion

        //#region Inbox controller

        routes.get('/inbox/:id', cors(corsReactOptions), inboxController.getInboxMessage)
        routes.post('/inbox', cors(corsReactOptions), inboxController.postInboxMessage)
        routes.get('/inboxNameList', cors(corsReactOptions), inboxController.getAllFansName)

        //#endregion

        //#region Product controller

        routes.get('/onlineStore', cors(corsReactOptions), productController.getProduct)
        routes.post('/onlineStore', cors(corsReactOptions), productUpload.single('image'), productController.postProduct)
        routes.put('/editOnlineStore/:id', cors(corsReactOptions), productUpload.single('image'), productController.editProduct)
        routes.delete('/onlineStore/:id', cors(corsReactOptions), productController.deleteProduct)

        //#endregion

        //#region Contact controller

        routes.get('/contact', cors(corsReactOptions), contactController.getContact)
        routes.put('/contact', cors(corsReactOptions), contactController.editContact)

        //#endregion

        //#region Login Controller

        routes.get('/currentUser', cors(corsReactOptions), loginController.queryGetCreator)
        routes.get('/currentFan', cors(corsReactOptions), isLoggedIn, loginController.queryGetFan)
        routes.post('/login', cors(corsReactOptions), loginController.queryLoginCreator)
        routes.post('/loginFan', cors(corsReactOptions), loginController.queryLoginFan)
        routes.get('/getPosts', cors(corsReactOptions), loginController.queryGetPosts)
        routes.get('/fetchFans', cors(corsReactOptions), loginController.queryFetchFans)
        routes.get('/fetchCreators', cors(corsReactOptions), loginController.queryGetCreators)
        routes.get('/fetchIsCreator', cors(corsReactOptions), isCreatorFRD)
        routes.put('/updateBoardCategory', cors(corsReactOptions), isCreator, loginController.queryUpdateCategory)

        //#endregion

        //#region Register Controller

        routes.post('/registerFan', cors(corsReactOptions), registerController.queryFanRegister)
        routes.post('/registerCreator', cors(corsReactOptions), creatorImgProfUpload.fields([
            { name: 'pfp' },
            { name: 'cvp' }
        ]), registerController.queryCreatorRegister)

        //#endregion

        //#region Calendar controller

        routes.get('/eventList', cors(corsReactOptions), calendarController.getEventList)
        routes.post('/addEvent', cors(corsReactOptions), calendarController.addEvent)

        //#endregion

        //#region Board controller

        routes.get('/getCustomBoard', cors(corsReactOptions), boardcontroller.getCustomBoard)
        routes.put('/customizeBoard', cors(corsReactOptions), customBoardUpload.single('media'), boardcontroller.customizeBoard)

        //#endregion

        //#region Post controller 

        routes.post('/addPostsText', cors(corsReactOptions), isCreator, addPostController.queryAddPostText)
        routes.post('/addPostsImage', cors(corsReactOptions), isCreator, creatorImgUpload.single('image'), addPostController.queryAddPostImage)
        routes.post('/addPostsVideo', cors(corsReactOptions), isCreator, creatorVidUpload.single('video'), addPostController.queryAddPostVideo)
        routes.post('/addPostsAudio', cors(corsReactOptions), isCreator, creatorAudUpload.single('audio'), addPostController.queryAddPostAudio)

        //#endregion

        //#region Edit controller

        routes.put('/editPassword', cors(corsReactOptions), isCreator, updateController.queryUpdatePassword)
        routes.put('/editDescription', cors(corsReactOptions), isCreator, updateController.queryUpdateDescription)
        routes.put('/editPFP', cors(corsReactOptions), isCreator, creatorImgUpload.single('pfp'), updateController.queryUpdatePFP)
        routes.put('/editCVP', cors(corsReactOptions), isCreator, creatorImgUpload.single('cvp'), updateController.queryUpdateCVP)
        routes.put('/editColourTheme', cors(corsReactOptions), isCreator, updateController.queryUpdateColourTheme)
        routes.put('/invertTheme', cors(corsReactOptions), isCreator, updateController.queryInvertColourTheme)
        //#endregion

        //#region Connect controller
        routes.post('/initDomain', cors(corsReferenceOptions), connectionController.initialize)
        routes.post('/addNewDomain', cors(corsOtherOptions), connectionController.addNewDomain)
        routes.post('/newDomainInit', cors(corsReactOptions), connectionController.fetchToNewDomain)
        routes.post('/updateAllDomain', cors(corsReactOptions), connectionController.fetchToExistDomain)
        //#endregion
    }
}