const express = require('express');
const router = express.Router();
const multer = require('multer');
const CheckAuth = require('../middleware/Auth-check')
const ProductController = require('../controllers/products')

const storage = multer.diskStorage({
    destination : function (req, file , cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); 
    }
})

const upload = multer({
    storage : storage,
});

router.get('/' , ProductController.product_get_all_products)

router.post('/',CheckAuth ,upload.single("productImage"),ProductController.product_post_product)

router.get('/:productId' , ProductController.product_get_single_product)

router.patch('/:productId',CheckAuth , ProductController.product_update_product)

router.delete('/:productId',CheckAuth, ProductController.product_delete_product)
module.exports = router;