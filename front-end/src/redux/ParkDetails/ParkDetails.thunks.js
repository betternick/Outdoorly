import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	getParkDetails,
	getReview,
	postReview,
	putReview,
	deleteReview,
	getImage,
	postImage,
} from "../../services/park-service";

export const retrieveParkDetails = createAsyncThunk(
	"parkDetails/retrieveParkDetails",
	async (_, thunkApi) => {
		const state = thunkApi.getState();
		const res = await getParkDetails(state.parkSearchInfo.selectedParkID);
		return res.data;
	}
);

export const retrieveParkReviews = createAsyncThunk(
	"parkDetails/retrieveReviews",
	async (_, thunkApi) => {
		const state = thunkApi.getState();
		const res = await getReview(
			state.parkDetails.details.id,
			state.parkDetails.currPage
		);
		const reviews = res.data;
		return reviews;
	}
);

export const postParkReview = createAsyncThunk(
	"parkDetails/postReview",
	async (review, thunkApi) => {
		const state = thunkApi.getState();
		const res = await postReview(state.parkDetails.details.id, review).then(
			() => {
				return getReview(
					state.parkDetails.details.id,
					state.parkDetails.currPage
				);
			}
		);
		return res.data;
	}
);

export const putParkReview = createAsyncThunk(
	"parkDetails/putReview",
	async (review, thunkApi) => {
		const state = thunkApi.getState();
		const res = await putReview(state.parkDetails.details.id, review).then(
			() => {
				return getReview(
					state.parkDetails.details.id,
					state.parkDetails.currPage
				);
			}
		);
		return res.data;
	}
);

export const deleteParkReview = createAsyncThunk(
	"parkDetails/deleteReview",
	async (userID, thunkApi) => {
		const state = thunkApi.getState();
		const res = await deleteReview(state.parkDetails.details.id, userID).then(
			() => {
				return getReview(
					state.parkDetails.details.id,
					state.parkDetails.currPage
				);
			}
		);
		return res.data;
	}
);

export const postParkImage = createAsyncThunk(
	"parkDetails/postImage",
	async (image, thunkApi) => {
		const state = thunkApi.getState();
		const res = await postImage(state.parkDetails.details["_id"], image).then(
			() => {
				return getImage(state.parkDetails.details["_id"]);
			}
		);
		return res.data;
	}
);

export const retrieveParkImages = createAsyncThunk(
	"parkDetails/retrieveImages",
	async (_, thunkApi) => {
		const state = thunkApi.getState();
		const res = await getImage(state.parkDetails.details["_id"]);
		const images = res.data;
		return images;
	}
);
