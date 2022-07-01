import React from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Container, Col } from 'reactstrap';

import PictureCard from '../pictureCard/pictureCard';
import xShape from './x_shape.svg';
import styles from './bootstrap.v5.min.module.css';
import localStyles from './likeListSidebar.module.scss'

const LikeListSidebar = ({ isSidebarOpen, likePictureList, closeSidebar, changeIsLikedOf }) => {
	return (
		<Offcanvas
			className={`${styles['offcanvas-end']} ${styles['offcanvas']} ${styles['fade']} ${styles['show']} ${localStyles['likeListSidebar']}`}
			backdrop={false}
			scrollable
			isOpen={isSidebarOpen}
		>
			<OffcanvasHeader className={`${styles['offcanvas-header']} ${localStyles['likeListSidebar__Header']}`}>
				<div className={localStyles.likeListSidebar__Header__text}>좋아요 리스트</div>
				<button
					type="button"
					className={`btn btn-primary ${localStyles['likeListSidebar__Header__closeButton']}`}
					id="sidebarCloseButton"
					onClick={closeSidebar}
				>
					<img src={xShape} alt="x표시" />
				</button>
			</OffcanvasHeader>

			<OffcanvasBody className={`${styles['offcanvas-body']} ${localStyles.likeListSidebar__Body}`}>
				{Array.isArray(likePictureList) && !likePictureList.length && (
					<div className={localStyles.likeListSidebar__Body__text} style={{ textAlign: 'center' }}>
						내가 좋아하는 이미지가 없습니다.
						<br/>
						마음에 드는 이미지를 추가해보세요.
					</div>
				)}
				<Container className={localStyles.likeListSidebar__Body__pictures} style={{ paddingLeft: 96, paddingRight: 96 }}>
					{Array.isArray(likePictureList) &&
						likePictureList.length > 0 &&
						likePictureList.map((picture) => (
							<Col key={picture.pictureId}>
								<PictureCard picture={picture} changeIsLikedOf={changeIsLikedOf} isLiked={true} />
							</Col>
						))}
				</Container>
			</OffcanvasBody>
		</Offcanvas>
	);
};

export default LikeListSidebar;