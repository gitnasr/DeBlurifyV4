const catchAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
const Safe = (fn) => catchAsync(fn);
module.exports = Safe;
