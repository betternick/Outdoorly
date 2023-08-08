const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const defaultModelConfig = { timestamps: true, toJSON: { virtuals: true } };

/**
 *
 * @param {string} collection
 * @param {Object} mongoose
 * @returns
 */
exports.getSchemaForCollection = (collection, mongoose) => {
  // collection = collection.toLowerCase();
  var schema = null;

  const schemaDefinition = require(`./${collection}`);
  schema = getSpecificSchema(mongoose, schemaDefinition);

  return schema;
};

/**
 *
 * @param {*} mongoose
 * @param {} formatObj
 * @returns
 */
function getSpecificSchema(mongoose, schema) {
  var Schema = mongoose.Schema;

  var schemaObj = new Schema(schema, defaultModelConfig);

  //Setup pagination plugins for models, and aggregates
  schemaObj.plugin(aggregatePaginate);

  return schemaObj;
}
