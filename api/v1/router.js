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

router.post('/ticket', (req, res) => {
	req.container.resolve('createTicketApi').handleRequest(req, res);
});

router.put('/ticket', (req, res) => {
	req.container.resolve('updateTicketApi').handleRequest(req, res);
});

router.get('/ticket', (req, res) => {
	req.container.resolve('readTicketApi').handleRequest(req, res);
});

router.delete('/ticket', (req, res) => {
	req.container.resolve('deleteTicketApi').handleRequest(req, res);
});

router.put('/ticket/settle', (req, res) => {
	req.container.resolve('settleTicketApi').handleRequest(req, res);
});

module.exports = router;