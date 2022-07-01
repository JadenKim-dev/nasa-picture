import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import 'intersection-observer';

import SearchBox from './components/searchBox/searchBox';
import PictureCardList from './components/pictureCardList/pictureCardList';
import styles from './App.module.scss';
import LikeListSidebar from './components/likeListSidebar/likeListSidebar';
import { getItem, setItem } from './localStorage';
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

	const changeIsSidebarOpen = () => {
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
					<section>
						<div className={styles.titleRow}>
							<h1 className={styles.title}>NASA 사진 검색</h1>
						</div>
					</section>
					<section>
						<div className={styles.searchBoxRow}>
							<SearchBox />
						</div>
					</section>
			</header>
			<main>
			<Container style={{ paddingLeft: 40, paddingRight: 40 }}>
				<section>
					<div className={styles.sidebarButtonRow}>
						<Button
							className={styles.sidebarButton}
							color="secondary"
							data-clicked={isSidebarOpen}
							onClick={changeIsSidebarOpen}
						>
							{isSidebarOpen 
								? <img src={heartFilledBlue} className={styles.sidebarButton__heart} alt="heart open" />
								: <img src={heartFilledBlack} className={styles.sidebarButton__heart} alt="heart close" />
							}
							<span className={styles.sidebarButton__text}>좋아요 리스트 보기</span>
						</Button>
					</div>
				</section>
				<section>
					<article>
						<div className={styles.cardListRow}>
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
						</div>
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