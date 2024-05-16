const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');

// User signup route
router.post('/signup', UserController.signup);

// User login route
router.post('/login', UserController.login);

// Get user details route
router.get('/:username', UserController.getUserDetailsByUsername)

// Update profile picture route
router.put('/:username/profile-picture', UserController.updateProfilePicture);

// Update user details route
router.put('/:username', UserController.updateUserDetails);
// In routes/UserRoutes.js

router.post('/:senderId/send-request/:receiverId', UserController.sendRequest);
router.put('/:senderId/accept-request/:requestId', UserController.acceptRequest);
router.put('/:senderId/decline-request/:requestId', UserController.declineRequest);
// In routes/UserRoutes.js

router.put('/:userId/block/:blockedUserId', UserController.blockUser);
router.put('/:userId/unblock/:blockedUserId', UserController.unblockUser);
router.put('/:userId/report/:reportedUserId', UserController.reportUser);
router.delete('/:userId/delete-account', UserController.deleteAccount);


module.exports = router;
