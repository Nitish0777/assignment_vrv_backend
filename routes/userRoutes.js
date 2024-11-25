const { Router } = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const stateController = require('../controllers/stateController')
const forgotController = require('../controllers/forgotController')
const router = Router();
const requireAuth = require('../helper/requireAuth')

router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)
router.patch('/reset-password/:id',authController.reset_Password)
router.post('/new-password',authController.update_Password)


router.get('/',requireAuth, userController.get_all_details);
router.get('/dropdownvalue', userController.get_dropdown)
router.get('/user-details/:id', userController.user_item)
router.get('/filter/:category', requireAuth, userController.filter_data);
router.get('/:email', userController.admin_check);
router.post('/:search', userController.search_Result);
router.patch('/user-details/:id',requireAuth, userController.userupdate_item)
router.patch('/all-details/:id', requireAuth, userController.update_item);
router.delete('/all-details/:id', requireAuth, userController.delete_item);

router.patch('/active/:id/',  stateController.active);
router.patch('/deactive/:id/', stateController.deactive);

router.post('/forgot-password',forgotController.forgot_password)

module.exports = router;
