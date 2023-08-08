const { getModelForCollection } = require("../../shared/mongoose");

const util = require("util");

async function fetchAllParksCoordinates() {
  const parks = await getModelForCollection("parksSchema");
  let allParks = await parks.find({}); // find without filter to fetch all documents

  let transformedParks = allParks.map((park) => {
    let parkObject = park.toObject(); // convert to plain JavaScript object
    return {
      ParkName: parkObject.fullName,
      ParkID: parkObject.id,
      Lat: parkObject.latitude,
      Lon: parkObject.longitude,
    };
  });
  // console.log(transformedParks);
  return transformedParks;
}

async function closestParksfromDB(Parks) {
  const parkIDs = Parks.map((obj) => obj.ParkID);
  const distances = Parks.map((obj) => obj.distance);
  // console.log(parkIDs);
  const parks = await getModelForCollection("parksSchema");
  let parksResult = await parks.find({ id: { $in: parkIDs } });

  // Create a map of ids to parks for quick access
  const idToParkMap = parksResult.reduce((map, park) => {
    map[park.id] = park;
    return map;
  }, {});

  // Sort based on the initial order of IDs
  parksResult = parkIDs.map((id) => idToParkMap[id]);

  // Add the distance property to the sorted parks.
  let combined = parksResult.map((park, index) => {
    let parkObject = park.toObject(); // convert to plain JavaScript object
    return { ...parkObject, distance: distances[index] };
  });

  // const query = parks
  // .find(queryBuilder)
  // .select(queryProjection)
  // .sort(sorting)
  // .limit(limit)
  // .skip(offset)
  // const data = await query.exec()

  // const data = combined.slice(offset, offset + limit);

  // const countQuery = combined.length;
  // console.log(countQuery);
  // const result = await paginateDataClosestParks(countQuery, data, page, limit);

  return combined;

  // console.log(util.inspect(parksResult, { depth: 3 }));
}

module.exports = {
  closestParksfromDB,
  fetchAllParksCoordinates,
};
