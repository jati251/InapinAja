const router=require('express').Router()
const Controller =require('../controllers/customer')
const authentication=require('../middlewares/authenticator')

//urusan user
router.post('/register', Controller.registerCustomer)
router.post('/login', Controller.loginCustomer)
router.post('/google-sign', Controller.loginGoogle)

router.post('/barcode', Controller.getBarcode)

// after login
router.get('/lodging', Controller.getLodging)
router.get('/types', Controller.getType)
router.get('/lodging/:id', Controller.findLodging)

router.use(authentication)

router.post('/wishlist', Controller.createWishList)
router.get('/wishlist', Controller.getWishList)



module.exports=router