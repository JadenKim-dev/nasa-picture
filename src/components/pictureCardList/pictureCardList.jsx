import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import PictureCard from '../pictureCard/pictureCard';
import { NASA_BASE_API_URL, NASA_BASE_ASSET_URL } from '../../consts/constants';
import styles from './pictureCardList.module.scss';

const PictureCardList = ({
	pictureList,
	onChangePictureList,
	likePictureIdList,
	changeIsLikedOf,
}) => { // 클래스 useState vs 함수형 useState
	const [isAllLoaded, setIsAllLoaded] = useState(false);
	const [pageNum, setPageNum] = useState(0);
	const [currentViewableCardNum, setCurrentViewableCardNum] = useState(0);
	const lastOfPage = useRef(null);
	const permitObserve = useRef(true);

	const location = useLocation();

	const likePictureIdSet = useMemo(() => new Set(likePictureIdList), [likePictureIdList]);

	const targetUrl = useMemo(() => {
		const { pathname, search } = location;
		let url = NASA_BASE_API_URL + '/search';
		if (pathname !== '/') {
			url += `${search}&media_type=image`;
		} else {
			url += '?media_type=image';
		}
		return url;
	}, [location]);

	useEffect(() => {
		onChangePictureList([]);
		setCurrentViewableCardNum(0);
		setIsAllLoaded(false);
		setPageNum(0);
		permitObserve.current = true;
	}, [location])

	useEffect(() => {
		const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
		if (lastOfPage.current) {
			observer.observe(lastOfPage.current);
		}
		return () => { observer.disconnect(); };
	}, [location]);

	const onIntersect = ([entry]) => {
		if (entry.isIntersecting) {
			permitObserve.current = false;
			setCurrentViewableCardNum((prevIdx) => prevIdx + 36);
		}
	};

	useEffect(() => {
		if (pictureList.length < currentViewableCardNum) {
			setPageNum((prevPageNum) => prevPageNum + 1);
		} else {
			permitObserve.current = true;
		}
	}, [currentViewableCardNum]);

	useEffect(() => {
		if (pageNum > 0) {
			getMoreItem()
				.then(() => {
					permitObserve.current = true;
				})
			  .catch((e) => {
				// error boundary 처리
					console.error(e)
				});
		}
	}, [pageNum]);

	const getMoreItem = () =>
		axios
			.get(`${targetUrl}&page=${pageNum}`)
			.then((res) => {
				const pictureItems = res.data.collection.items;
				if (!pictureItems.length) {
					setIsAllLoaded(true);
					
					return;
				}
				const pictures = pictureItems
					.filter((pictureItem) => pictureItem.data[0].media_type === 'image')
					.map((pictureItem) => {
						const { title, description, nasa_id, date_created } = pictureItem.data[0];
						const pictureSrc = NASA_BASE_ASSET_URL + `/image/${nasa_id}/${nasa_id}~thumb.jpg`;
						return { title, description, pictureSrc, date_created, pictureId: nasa_id };
					});
				onChangePictureList(pictureList.concat(pictures));
			})
			.catch((e) => {
				throw e;
			});
	

	const parseSearchContent = (queryString) => {
		return decodeURI(queryString.substr(queryString.indexOf('=') + 1));
	};

	return (
		<>
			<div className=''>
				{isAllLoaded && !pictureList.length && (
					<p className={styles.noSuchPictureText}>
						<span className={styles.searchContentText}>
							'{parseSearchContent(location.search)}'
						</span>에 대한 검색결과가 없습니다.
					</p>
				)}
			</div>
			<div className={styles.cardList}>
				{pictureList.slice(0, currentViewableCardNum).map((picture) => (
					<PictureCard
						key={picture.pictureId}
						picture={picture}
						changeIsLikedOf={changeIsLikedOf}
						isLiked={likePictureIdSet.has(picture.pictureId)}
					/>
				))}
			</div>

				<div style={{marginTop:40, display:'flex', justifyContent:'center'}}>
					<div ref={lastOfPage}></div>
					{!isAllLoaded && (
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
								)}
				</div>	
		</>
	);
};

export default PictureCardList;