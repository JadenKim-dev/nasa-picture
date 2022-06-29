import React from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Container, Row, Col } from 'reactstrap';

import PictureCard from './pictureCard';
import styles from './bootstrap.v5.min.module.css';

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
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.5738 1.57438L7.14877 6.00063L11.5738 10.4256L10.4263 11.5744L6.00002 7.14813L1.57377 11.5744L0.42627 10.4256L4.85127 6.00063L0.42627 1.57438L1.57377 0.425629L6.00002 4.85188L10.4263 0.425629L11.5738 1.57438Z"
							fill="white"
						/>
					</svg>
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