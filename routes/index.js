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

// checked and working, tested in postman
router.patch('/reset-password/:id',authController.reset_Password);

// checked and working, tested in postman
router.post('/new-password',authController.update_Password);


//User Related Routes
// checked and working, tested in postman
router.get('/',requireAuth, userController.get_all_details);

// checked and working, tested in postman
router.get('/dropdownvalue', userController.get_dropdown)

// checked and working, tested in postman
router.get('/user-details/:id', userController.user_item);

// checked and working, tested in postman
router.get('/filter/:category', requireAuth, userController.filter_data);

// checked and working, tested in postman
router.get('/:email', userController.admin_check);

// checked and working, tested in postman
router.post('/:search', userController.search_Result);

// checked and working, tested in postman
router.patch('/user-details/:id',requireAuth, userController.userupdate_item);

// checked and working, tested in postman
router.patch('/all-details/:id', requireAuth, userController.update_item);
router.delete('/all-details/:id', requireAuth, userController.delete_item);


// State Related Routes means activate or deactive
// checked and working, tested in postman
router.patch('/active/:id/',  stateController.active);

// checked and working, tested in postman
router.patch('/deactive/:id/', stateController.deactive);

//Forgot Password
router.post('/forgot-password',forgotController.forgot_password)

module.exports = router;
