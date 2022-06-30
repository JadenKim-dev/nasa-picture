import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import 'intersection-observer';

import SearchBox from './components/searchBox/searchBox';
import PictureCardList from './components/pictureCardList/pictureCardList';
import './App.scss';
import LikeListSidebar from './components/likeListSidebar/likeListSidebar';
import { getItem, setItem } from './sessionStorage';
import heartFilledBlue from './heart_filled_blue.svg'
import heartFilledBlack from './heart_filled_black.svg'

const App = () => {
	const [pictureList, setPictureList] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [likePictureList, setLikePictureList] = useState([]);

	useEffect(() => {
		setLikePictureList(getItem('likePictureList'))
	}, [])

	const likePictureIdList = useMemo(() => (
		likePictureList.map(picture => picture.pictureId)
	), [likePictureList])

	const changeIsLikedOf = (picture) => {
		const findIdx = likePictureIdList.indexOf(picture.pictureId);
		if (findIdx === -1) {
			setLikePictureList([picture].concat(likePictureList));
		} else {
			const newLikePictureList = likePictureList.slice();
			newLikePictureList.splice(findIdx, 1);
			setLikePictureList(newLikePictureList);
		}
	};

	const handleClickSidebarButton = () => {
		setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};
	
	const onChangePictureList = (newPictureList) => {
		setPictureList(newPictureList);
	}

	useEffect(() => {
		setItem('likePictureList', likePictureList)
	}, [likePictureList])

	return (
		<BrowserRouter>
			<header>
				<Container>
					<section>
						<Row className="titleRow">
							<Col xs={{ size: 4, offset: 4 }} className="headerCol">
								<h1>NASA 사진 검색</h1>
							</Col>
						</Row>
					</section>
					<section>
						<Row className="searchBoxRow">
							<Col xs={{ size: 6, offset: 3 }} className="headerCol">
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
								{isSidebarOpen 
									? <img src={heartFilledBlue} alt="heart open" />
									: <img src={heartFilledBlack} alt="heart close" />
								}
								<span className="sidebarButton__text">좋아요 리스트 보기</span>
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
											pictureList={pictureList}
											onChangePictureList={onChangePictureList}
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