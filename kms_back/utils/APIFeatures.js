class APIFeatures{
 
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
        // this.limit = null;
        this.nbrOfPages = null;
    }

    filter(){

        // Filtering 
        const queryObj = {...this.queryString};
        const excludedFields = ["page","limit","sort","fields","search"];
        excludedFields.forEach(el => delete queryObj[el]);
    
        // Advanced Filering 
        // { difficulty: 'easy', duration: { lt: '9' }, maxGroupSize: { gte: '3' } }
        // replace lt by $lt ...
        let queryStr = JSON.stringify(queryObj);
        ["lt","lte","gt","gte"].forEach(el => {
            queryStr = queryStr.replaceAll(`"${el}"`,`"$${el}"`);
        });

        // Query
        this.query = this.query.find(JSON.parse(queryStr))

        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortedBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortedBy);
        }else{
            this.query = this.query.sort("-createdAt");
        }

        return this;

    }

    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select("-__v");
        }
        return this;
    }

    paginate(){

        const page = this.queryString.page * 1|| 1;
        const limit = this.queryString.limit * 1 || 6;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;