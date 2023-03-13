const router = (require('express')).Router();

router.post('/parking', (req, res) => {
	req.container.resolve('createParkingApi').handleRequest(req, res);
});

router.put('/parking', (req, res) => {
	req.container.resolve('updateParkingApi').handleRequest(req, res);
});

router.get('/parking', (req, res) => {
	req.container.resolve('readParkingApi').handleRequest(req, res);
});

router.delete('/parking', (req, res) => {
	req.container.resolve('deleteParkingApi').handleRequest(req, res);
});

module.exports = router;