const express = require('express');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const coopConfig = require('../middlewares/coop-config');
const coopCtrl = require('../controllers/cooperative');
const itemCtrl = require('../controllers/item');

const router = express.Router();

router.post('/create', multer, auth, coopCtrl.createCoop);
router.get('/coops', auth, coopCtrl.fetchMyCoops);
router.get('/:coopId', auth, coopConfig, coopCtrl.fetchCoop);

// Item routes
router.post('/:coopId/add_item', multer, auth, coopConfig, itemCtrl.addItemtoCoop);
router.get('/:coopId/items', auth, itemCtrl.fetchCoopItems);
router.get('/all_items', auth, itemCtrl.fetchAllItems);
router.get('/:coopId/item/:itemId', auth, itemCtrl.fetchSingleCoopItem);
router.put('/:coopId/item/:itemId', multer, auth, coopConfig, itemCtrl.editSingleCoopItem);


// Member routes
router.get('/:coopId/members', auth, coopConfig, coopCtrl.fetchCoopMembers);
router.put('/:coopId/add_member', auth, coopConfig, coopCtrl.addMember);

// Forum routes
router.post('/:coopId/create_forum', auth, coopConfig, coopCtrl.createForum);
router.get('/:coopId/forum', auth, coopConfig, coopCtrl.forum);
router.post('/:coopId/forum', auth, coopConfig, coopCtrl.sendMessageToForum);

module.exports = router;
