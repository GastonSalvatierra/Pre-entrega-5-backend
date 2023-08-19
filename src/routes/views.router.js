import express from 'express';
const router = express.Router();


router.get('/message', (req, res) => {
    res.render('chats', {})
})


export default router;