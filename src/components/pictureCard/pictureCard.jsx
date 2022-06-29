import React, { useState, useMemo } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import './style.scss';

const PictureCard = ({
	picture,
	changeIsLikedOf,
	isLiked,
}) => {
  const { pictureId, pictureSrc, title, date_created, description } 
    = useMemo(() => picture, [picture])

	const handleClickLike = () => {
		changeIsLikedOf(pictureId);
	};

	return (
		<Card>
			<CardImg src={pictureSrc} />
			<button className="likeButton" onClick={handleClickLike} value={pictureId}>
				{!isLiked && (
					<svg
						width="20"
						height="18"
						viewBox="0 0 20 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M5.31936 0.749405C4.02186 0.749405 2.72436 1.2444 1.73436 2.2344C-0.244137 4.21441 -0.244137 7.4244 1.73436 9.4044L2.82936 10.4979H2.82786L9.99786 17.6679L18.2569 9.4074C20.2369 7.4274 20.2369 4.2189 18.2569 2.2389C17.2669 1.2489 15.9709 0.753905 14.6719 0.753905C13.3759 0.753905 12.0784 1.2489 11.0884 2.2389L9.99786 3.3294L8.90436 2.2344C7.91286 1.2444 6.61686 0.749405 5.31936 0.749405ZM5.31936 2.7009C6.15186 2.7009 6.93636 3.0249 7.52436 3.6129L8.61936 4.7079L9.99786 6.0879L11.3764 4.7079L12.4669 3.6174C13.0564 3.0294 13.8394 2.7054 14.6719 2.7054C15.5059 2.7054 16.2889 3.0294 16.8784 3.6174C18.0949 4.8339 18.0949 6.8124 16.8784 8.03041L9.99786 14.9094L4.20786 9.1194L3.11286 8.0259C2.52486 7.4364 2.19936 6.6534 2.19936 5.8194C2.19936 4.9854 2.52486 4.2039 3.11286 3.6129C3.70236 3.0249 4.48536 2.7009 5.31936 2.7009Z"
							fill="white"
						/>
					</svg>
				)}
				{isLiked && (
					<svg
						width="20"
						height="18"
						viewBox="0 0 20 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M18.2574 2.23837C16.2774 0.258375 13.0689 0.258375 11.0889 2.23837L9.99835 3.32887L8.90485 2.23387C6.92485 0.255375 3.71485 0.255375 1.73485 2.23387C-0.243648 4.21387 -0.243648 7.42387 1.73485 9.40237L2.82985 10.4974L2.82835 10.4989L9.99835 17.6674L18.2574 9.40687C20.2374 7.42837 20.2374 4.21687 18.2574 2.23837Z"
							fill="#FA5F6E"
						/>
					</svg>
				)}
			</button>

			<CardBody>
				<CardTitle>{title}</CardTitle>
				<CardSubtitle>{date_created}</CardSubtitle>
				<CardText>{description}</CardText>
			</CardBody>
		</Card>
	);
};

export default PictureCard;