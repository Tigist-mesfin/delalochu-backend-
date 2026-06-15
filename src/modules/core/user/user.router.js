// src/modules/core/user/user.router.js
const router = require('express').Router();
const controller = require('./user.controller');
const { validateBody, validateParams } = require('../../../shared/middlewares/validate.wrapper');
const schemas = require('./user.validation');
const auth = require('../../../shared/middlewares/auth.middleware');   // optional

router.post('/', auth, validateBody(schemas.createUser), controller.createUser);
router.get('/:id', validateParams(schemas.userId), controller.getUser);
router.put('/:id', auth, validateParams(schemas.userId), validateBody(schemas.updateUser), controller.updateUser);

module.exports = router;