module.exports = function (arr) {
    return arr.filter(item => item.category_id == 1).slice(-3).concat(arr.filter(item => item.category_id == 2).slice(-3));
};
