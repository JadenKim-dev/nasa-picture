import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import 'intersection-observer';

import SearchBox from './components/searchBox/searchBox';
import PictureCardList from './components/pictureCard/pictureCardList';
import './style.scss';
import LikeListSidebar from './components/pictureCard/likeListSidebar';

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [likePictureList, setLikePictureList] = useState([]);
	const [likePictureIdList, setLikePictureIdList] = useState([]);

	const changeIsLikedOf = (pictureId) => {
		const findIdx = likePictureIdList.indexOf(pictureId);
		if (findIdx === -1) {
			setLikePictureIdList(likePictureIdList.concat([pictureId]));
		} else {
			const newLikePictureIdList = likePictureIdList.slice();
			newLikePictureIdList.splice(findIdx, 1);
			setLikePictureIdList(newLikePictureIdList);
		}
	};

	const handleClickSidebarButton = () => {
		setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const onChangeLikePictureList = (likePictureList) => {
		setLikePictureList(likePictureList.reverse());
	};

	return (
		<BrowserRouter>
			<header>
				<Container>
					<section>
						<Row className="titleRow">
							<Col
								xs={{ size: 4, offset: 4 }}
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<h1 className="title">NASA 사진 검색</h1>
							</Col>
						</Row>
					</section>
					<section>
						<Row className="searchBoxRow">
							<Col
								xs={{ size: 6, offset: 3 }}
								style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}
							>
								<SearchBox />
							</Col>
						</Row>
					</section>
				</Container>
			</header>
			<main>
				<Container>
					<section>
						<Row className="sidebarButtonRow">
							<Button
								className="sidebarButton"
								color="secondary"
								data-clicked={isSidebarOpen}
								onClick={handleClickSidebarButton}
							>
								{isSidebarOpen ? (
									<svg
										width="18"
										height="15"
										viewBox="0 0 18 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M15.8809 1.36531C14.2309 -0.284688 11.5572 -0.284688 9.90717 1.36531L8.99842 2.27406L8.08717 1.36156C6.43717 -0.287188 3.76217 -0.287188 2.11217 1.36156C0.463423 3.01156 0.463423 5.68656 2.11217 7.33531L3.02467 8.24781L3.02342 8.24906L8.99842 14.2228L15.8809 7.33906C17.5309 5.69031 17.5309 3.01406 15.8809 1.36531Z"
											fill="#1D6CE0"
										/>
									</svg>
								) : (
									<svg
										width="18"
										height="15"
										viewBox="0 0 18 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M15.8808 1.36531C14.2308 -0.284688 11.5571 -0.284688 9.90705 1.36531L8.9983 2.27406L8.08705 1.36156C6.43705 -0.287188 3.76205 -0.287188 2.11205 1.36156C0.463301 3.01156 0.463301 5.68656 2.11205 7.33531L3.02455 8.24781L3.0233 8.24906L8.9983 14.2228L15.8808 7.33906C17.5308 5.69031 17.5308 3.01406 15.8808 1.36531Z"
											fill="black"
										/>
									</svg>
								)}
								<span className="sidebarButtonText">좋아요 리스트 보기</span>
							</Button>
						</Row>
					</section>
					<section>
						<article>
							<Routes>
								<Route
									path="*"
									element={
										<PictureCardList
											onChangeLikePictureList={onChangeLikePictureList}
											likePictureIdList={likePictureIdList}
											changeIsLikedOf={changeIsLikedOf}
										/>
									}
								></Route>
							</Routes>
						</article>
					</section>
				</Container>
			</main>
			<aside>
				<section>
					<LikeListSidebar
						isSidebarOpen={isSidebarOpen}
						closeSidebar={closeSidebar}
						likePictureList={likePictureList}
						changeIsLikedOf={changeIsLikedOf}
					/>
				</section>
			</aside>
		</BrowserRouter>
	);
};

export default App;