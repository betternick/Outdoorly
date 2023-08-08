const { getModelForCollection } = require("../../shared/mongoose");

async function getReviewDAOS(parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  // If no park was found, throw an error.
  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const result = park.userReviews;
  return result;
}

async function addReviewDAOS(newReview, parkId) {
  console.log(newReview);
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  // If no park was found, throw an error.
  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  // check if a review by the same user already exists.
  const existingReviewIndex = park.userReviews.findIndex(
    (review) => review.userID === newReview.userID
  );

  if (existingReviewIndex !== -1) {
    throw new Error(`A review by user ${newReview.userID} already exists.`);
  }

  const result = await parks.findOneAndUpdate(
    { id: parkId },
    { $push: { userReviews: newReview } }
  );
  //   console.log(result);
}

async function editReviewDAOS(editedReview, parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const reviewIndex = park.userReviews.findIndex(
    (review) => review.userID === editedReview.userID
  );

  if (reviewIndex === -1) {
    throw new Error(`No review found with userID ${editedReview.userID}`);
  }

  park.userReviews[reviewIndex] = editedReview;
  await park.save();
}

async function deleteReviewDAOS(userId, parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const reviewIndex = park.userReviews.findIndex(
    (review) => review.userID === userId
  );

  if (reviewIndex === -1) {
    throw new Error(
      `No review found with userID ${userId} for Park with ID ${parkId}`
    );
  }

  park.userReviews.splice(reviewIndex, 1);
  await park.save();
}

module.exports = {
  addReviewDAOS,
  editReviewDAOS,
  deleteReviewDAOS,
  getReviewDAOS,
};

// const newReview = {
//   comment: "yayy a comment",
//   createdAt: new Date(),
//   userName: "Samuel",
//   userID: 1234,
//   title: "my trip",
//   experienceRating: 5,
// };

// addReview(newReview, "6DA17C86-088E-4B4D-B862-7C1BD5CF236Bt");

// const newReview = {
//   comment: "yayy a comment",
//   createdAt: new Date(),
//   userName: "Sammy",
//   userID: 999,
//   title: "my trip",
//   experienceRating: 5,
// };

// addReviewDAOS(newReview, "6DA17C86-088E-4B4D-B862-7C1BD5CF236B");

// const newReview2 = {
//   comment: "ahhhhhchanged",
//   createdAt: new Date(),
//   userName: "Sammhghy",
//   userID: 12345,
//   title: "my trip",
//   experienceRating: 5,
// };

// editReviewDAOS(newReview2, "6DA17C86-088E-4B4D-B862-7C1BD5CF236B");

// deleteReviewDAOS(999, "6DA17C86-088E-4B4D-B862-7C1BD5CF236B");
