const slugify = require('slugify')
const Category = require('../models/category')

exports.create_category = (req, res) => {
    const categoryObj = {
        name : req.body.name,
        slug : slugify(req.body.name), 
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save()
    .then(category => {
        res.status(200).json({category})
    })
    .catch(err => {
        res.status(500).json({ error  : err})
    })
}

function create_categoryList(categories  , parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cat of category ){
        categoryList.push({
            _id : cat._id,
            name : cat.name, 
            slug : cat.slug,
            children : create_categoryList(categories , cat._id)
        })
    }
    return categoryList;
}

exports.get_categories = (req, res) => {
    Category.find({})
    .exec((err, category) => {
        if (err) return  res.status(500).json({err}) ;
        if(category) {
            const categoryList  = create_categoryList(category)
            res.status(200).json({categoryList})
        }
    })
}