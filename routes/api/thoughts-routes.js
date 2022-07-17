const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThoughts,
    updateThought,
    deleteThought,
    addReaction

} = require('../../controllers/thought-controller');

//-- /api/thought <GET>
router.route('/').get(getAllThoughts);

//-- /api/thoughts/:userId <POST>
router.route('/:userId').post(createThoughts);

//-- /api/thought/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

//-- /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

//-- /api/thoughts/:thoughtId/reactionId <DELETE>
//router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;

