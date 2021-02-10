const route = (route) => {
	console.log("Routing: " + route.cyan);
};

const error = (route, err) => {
	console.log("Error: " + route.red + ": " + err);
};

module.exports = {
	route,
	error,
};
