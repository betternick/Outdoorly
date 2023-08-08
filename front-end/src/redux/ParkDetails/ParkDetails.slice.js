import { createSlice } from "@reduxjs/toolkit";
import {
	retrieveParkDetails,
	retrieveParkReviews,
	postParkReview,
	putParkReview,
	deleteParkReview,
	retrieveParkImages,
	postParkImage,
} from "./ParkDetails.thunks";

const INITIAL_STATE = {
	details: undefined,
	userReviews: undefined,
	userImages: [],
	loading: false,
	loadingParkReviews: false,
	loadingParkImages: false,
	currPage: 1,
};

const parkDetailsSlice = createSlice({
	name: "parkDetails",
	initialState: INITIAL_STATE,
	reducers: {
		submitUserReview: (state, action) => {
			return { ...state, review: action.payload };
		},
		submitUserImage: (state, action) => {
			state.parkDetails.images.push({
				...action.payload,
				id: state.currImageID,
			});
			state.currImageID++;
		},
		setPageNumber: (state, action) => {
			state.currPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(retrieveParkDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(retrieveParkDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.details = action.payload;
			})
			.addCase(retrieveParkDetails.rejected, (state) => {
				state.loading = false;
			})

			.addCase(retrieveParkReviews.pending, (state) => {
				state.loadingParkReviews = true;
			})
			.addCase(retrieveParkReviews.fulfilled, (state, action) => {
				state.loadingParkReviews = false;
				state.userReviews = action.payload;
			})
			.addCase(retrieveParkReviews.rejected, (state) => {
				state.loadingParkReviews = false;
			})

			.addCase(postParkReview.pending, (state) => {
				state.loadingParkReviews = true;
			})
			.addCase(postParkReview.fulfilled, (state, action) => {
				state.loadingParkReviews = false;
				state.userReviews = action.payload;
			})
			.addCase(postParkReview.rejected, (state) => {
				state.loadingParkReviews = false;
			})

			.addCase(putParkReview.pending, (state) => {
				state.loadingParkReviews = true;
			})
			.addCase(putParkReview.fulfilled, (state, action) => {
				state.loadingParkReviews = false;
				state.userReviews = action.payload;
			})
			.addCase(putParkReview.rejected, (state) => {
				state.loadingParkReviews = false;
			})

			.addCase(deleteParkReview.pending, (state) => {
				state.loadingParkReviews = true;
			})
			.addCase(deleteParkReview.fulfilled, (state, action) => {
				state.loadingParkReviews = false;
				state.userReviews = action.payload;
			})
			.addCase(deleteParkReview.rejected, (state) => {
				state.loadingParkReviews = false;
			})

			.addCase(retrieveParkImages.pending, (state) => {
				state.loadingParkImages = true;
			})
			.addCase(retrieveParkImages.fulfilled, (state, action) => {
				state.loadingParkImages = false;
				state.userImages = action.payload;
			})
			.addCase(retrieveParkImages.rejected, (state) => {
				state.loadingParkImages = false;
			})

			.addCase(postParkImage.pending, (state) => {
				state.loadingParkImages = true;
			})
			.addCase(postParkImage.fulfilled, (state, action) => {
				state.loadingParkImages = false;
				state.userImages = action.payload;
			})
			.addCase(postParkImage.rejected, (state) => {
				state.loadingParkImages = false;
			});
	},
});

export const { submitUserReview, submitUserImage, setPageNumber } =
	parkDetailsSlice.actions;
export default parkDetailsSlice.reducer;
