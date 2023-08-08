import styles from "./result-list-item.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ResultListItem({
	fullName,
	parkID,
	description,
	images,
	distance,
	park,
}) {
	const [address, setAddress] = useState({});

	useEffect(() => {
		setAddress(
			park.addresses.reduce((acc, curr) => {
				return curr.type === "Physical" ? curr : acc;
			}, {})
		);
	}, []);
	return (
		<div className={styles.parkContainer}>
			<Card>
				<CardContent>
					<div
						className={styles.listItemWrapper}
						onClick={() => (window.location.href = `/park-details/${parkID}`)}>
						<Typography
							className={styles.title}
							sx={{ fontSize: 30, lineHeight: 0.7, mb: 1 }}>
							{fullName}
						</Typography>
						<Typography>
							{address.line2 +
								" " +
								address.city +
								", " +
								address.stateCode +
								", " +
								address.countryCode +
								" " +
								address.postalCode}{" "}
						</Typography>
						{distance && <h4>Distance: {distance.toFixed(2)} km</h4>}
						<div className={styles.resultsWrapper}>
							<img
								className={styles.previewImage}
								src={images[0].url}
								alt={images[0].altText}
							/>
							<div className={styles.previewText}>
								<div>{description}</div>
								<div>
									<Button className={styles.moreDetailsButton}>
										More details
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
