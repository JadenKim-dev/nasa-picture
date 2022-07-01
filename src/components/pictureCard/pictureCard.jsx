import React, { useMemo } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import heartBlank from './heart_blank.svg'
import heartFilledRed from './heart_filled_red.svg';
import styles from './pictureCard.module.scss';

const PictureCard = ({
	picture,
	changeIsLikedOf,
	isLiked,
}) => {
  const {pictureId, pictureSrc, title, date_created, description} = picture;

	const handleClickLike = () => {
		changeIsLikedOf(picture);
	};

	return (
		<Card className={styles.pictureCard}>
			<CardImg className={styles.pictureCard__img} src={pictureSrc} al="nasa picture" />
			<button className={styles.pictureCard__likeButton} onClick={handleClickLike} value={pictureId}>
				{!isLiked
					? <img src={heartBlank} alt="좋아요 하지 않은 사진" />
					: <img src={heartFilledRed} alt="좋아요 한 사진" />
				}
			</button>

			<CardBody className={styles.pictureCard__Body}>
				<CardTitle className={styles.pictureCard__Body__title}>{title}</CardTitle>
				<CardSubtitle className={styles.pictureCard__Body__subtitle}>{date_created}</CardSubtitle>
				<CardText className={styles.pictureCard__Body__desc}>{description}</CardText>
			</CardBody>
		</Card>
	);
};

export default PictureCard;