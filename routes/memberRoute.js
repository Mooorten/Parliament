const express = require('express')
const router = express.Router();
const Member = require('../models/memberModel');
const memberController = require('../controllers/memberController');

//Route to create a new member
router.get('/new', (req, res) => {
    res.render('new');
});

//Route to edit an existing member
router.get('/member/:id/edit', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id)
        res.render('edit', {member});
    } catch (err){
        console.error(err);
        res.status(500).send("Error while editing member");
    }
})

router.get('/', memberController.getAllMembers)
router.post('/member', memberController.createMember);
router.post('/member/:id/update', memberController.updateMember);
router.post('/member/:id/delete', memberController.deleteMember);

module.exports = router;