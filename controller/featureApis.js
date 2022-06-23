function futureApis (query,queryString){
    this.query = query //Product.find
    this.queryString = queryString //req.query

    this.pageting =()=>{
        const page = this.queryString.page *1|| 1
        const limit= this.queryString.limit *1|| 5
        const sort = this.queryString.sort  || "-createdAt"
        const skip = limit*(page-1)
        this.query = this.query.limit(limit).skip(skip).sort(sort)
        return this
    }
    this.filtering =()=>{
        const queryObj = {...this.queryString}
        const excludedFields = ["page","sort","search","limit"]
        excludedFields.forEach(el=>delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }
}

module.exports = futureApis