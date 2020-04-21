/* This mongoose model represents tutotials collection 
in mongoDB database, and these fields will be generated
automatically for each Tutorial document */
module.exports = mongoose => {
    var schema = mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
    },
    { timestamps: true });

    /* We override toJSON method that map default object
    to a custom object, in order to use the field 'id' 
    instead '_id' */
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;

};