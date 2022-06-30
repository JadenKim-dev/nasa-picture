import React from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Container, Row, Col } from 'reactstrap';

import PictureCard from '../pictureCard/pictureCard';
import xShape from './x_shape.svg';
import styles from './bootstrap.v5.min.module.css';
import './likeListSidebar.scss'

const LikeListSidebar = ({ isSidebarOpen, closeSidebar, likePictureList, changeIsLikedOf }) => {
	return (
		<Offcanvas
			className={`${styles['offcanvas-end']} ${styles['offcanvas']} ${styles['fade']} ${styles['show']} likeListSidebar`}
			backdrop={false}
			scrollable
			isOpen={isSidebarOpen}
			style={{ borderLeft: 'none' }}
		>
			<OffcanvasHeader className={`${styles['offcanvas-header']} likeListSideBarHeader`}>
				<h2 className="likeListSideBarHeaderText">좋아요 리스트</h2>
				<button
					type="button"
					className="btn btn-primary"
					id="sidebarCloseButton"
					onClick={closeSidebar}
				>
					<img src={xShape} />
				</button>
			</OffcanvasHeader>

			<OffcanvasBody className={`${styles['offcanvas-body']} likeListSideBarBody`}>
				{Array.isArray(likePictureList) && !likePictureList.length && (
					<p className="likeListSideBarBodyText" style={{ textAlign: 'center' }}>
						내가 좋아하는 이미지가 없습니다.
						<br />
						마음에 드는 이미지를 추가해보세요.
					</p>
				)}
				<Container className="likePictureList" style={{ paddingLeft: 96, paddingRight: 96 }}>
					{Array.isArray(likePictureList) &&
						likePictureList.length > 0 &&
						likePictureList.map((picture) => (
							<Row className="likePictureRow">
								<Col key={picture.pictureId}>
									<PictureCard picture={picture} changeIsLikedOf={changeIsLikedOf} isLiked={true} />
								</Col>
							</Row>
						))}
				</Container>
			</OffcanvasBody>
		</Offcanvas>
	);
};

export default LikeListSidebar;