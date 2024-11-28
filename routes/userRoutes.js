const { Router } = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const stateController = require('../controllers/stateController')
const forgotController = require('../controllers/forgotController')
const router = Router();
const requireAuth = require('../helper/requireAuth');
const verifyAuthToken = require('../middleware/checkIsLoggedIn');

//Auth Realted Routes
// Test this route in Postman tested and working
router.post('/signup', authController.signup_post)

// checked and working, tested in postman
router.post('/login', authController.login_post)

// checked and working, tested in postman
router.delete('/logout', authController.logout_delete);

// checked and working, tested in postman
router.get('/check-login', verifyAuthToken, (req, res) => {
    return res.status(200).json({
        message: 'User is logged in',
        user: req.user, // Contains decoded user data from the token
    });
});


router.patch('/reset-password/:id',authController.reset_Password)
router.post('/new-password',authController.update_Password)

//User Related Routes
router.get('/',requireAuth, userController.get_all_details);
router.get('/dropdownvalue', userController.get_dropdown)
router.get('/user-details/:id', userController.user_item)
router.get('/filter/:category', requireAuth, userController.filter_data);
router.get('/:email', userController.admin_check);
router.post('/:search', userController.search_Result);
router.patch('/user-details/:id',requireAuth, userController.userupdate_item);
router.patch('/all-details/:id', requireAuth, userController.update_item);
router.delete('/all-details/:id', requireAuth, userController.delete_item);


// State Related Routes means activete or deactive
router.patch('/active/:id/',  stateController.active);
router.patch('/deactive/:id/', stateController.deactive);

//Forgot Password
router.post('/forgot-password',forgotController.forgot_password)

module.exports = router;
