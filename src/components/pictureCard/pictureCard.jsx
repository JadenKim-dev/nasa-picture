import React, { useState, useMemo } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import './pictureCard.scss';
import heartBlank from './heart_blank.svg'
import heartFilledRed from './heart_filled_red.svg';
const PictureCard = ({
	picture,
	changeIsLikedOf,
	isLiked,
}) => {
  const { pictureId, pictureSrc, title, date_created, description } 
    = useMemo(() => picture, [picture])

	const handleClickLike = () => {
		changeIsLikedOf(picture);
	};

	return (
		<Card>
			<CardImg src={pictureSrc} />
			<button className="likeButton" onClick={handleClickLike} value={pictureId}>
				{!isLiked
					? <img src={heartBlank} />
					: <img src={heartFilledRed} />
				}
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