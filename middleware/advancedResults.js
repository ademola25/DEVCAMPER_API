const advancedResults = (model, populate) => async (req, res, next) => {
    let query;
    //copy re.query
    const reqQuery = {
        ...req.query
    };
    //fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page'];

    //loop over the removefields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //create query string
    let queryStr = JSON.stringify(reqQuery);

    //create operators ($gt, $gte, $lte, $lt)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    // finding the resources    
    query = model.find(JSON.parse(queryStr));

    //selecting fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        console.log(fields)
    }

    // sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt')
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query =query.populate(populate);
    }

    //executing query
    const results = await query;
    // pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
};

module.exports = advancedResults;