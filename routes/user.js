const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/',
    isAuthenticated, 
    userController.getAllUsers
);

router.get('/:id',
    isAuthenticated,
    userController.getSingleUser
);

// Not authenticated since it will register the user
router.post('/', userController.createUser);

router.put('/:id', 
    isAuthenticated,
    userController.updateUser
);

router.delete('/:id', 
    isAuthenticated,
    userController.deleteUser
);

module.exports = router;