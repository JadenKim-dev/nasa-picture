import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, CardColumns } from 'reactstrap';
import shortid from 'shortid';

import PictureCard from './pictureCard';
import { NASA_BASE_API_URL, NASA_BASE_ASSET_URL } from '../../consts/constants';
import './style.scss';

const PictureCardList = ({
	pictureList,
	onChangePictureList,
	likePictureIdList,
	changeIsLikedOf,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAllLoaded, setIsAllLoaded] = useState(false);
	const [pageNum, setPageNum] = useState(0);
	const [lastOfPage, setLastOfPage] = useState(null);

	const [currentViewableCardNum, setCurrentViewableCardNum] = useState(0);

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
	}, [location])

	useEffect(() => {
		let observer;
		if (lastOfPage) {
			observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
			observer.observe(lastOfPage);
		}
		return () => observer && observer.disconnect();
	}, [lastOfPage]);

	const onIntersect = ([entry], observer) => {
		if (entry.isIntersecting && !isLoading) {
			setIsLoading(true);
			observer.unobserve(lastOfPage);
			setCurrentViewableCardNum((prevIdx) => prevIdx + 36);
			observer.observe(lastOfPage);
		}
	};

	useEffect(() => {
		if (pictureList.length < currentViewableCardNum) {
			setPageNum((prevPageNum) => prevPageNum + 1);
		} else {
			setIsLoading(false);
		}
	}, [currentViewableCardNum]);

	useEffect(() => {
		if (pageNum > 0) {
			new Promise((resolve, reject) => {
				resolve(getMoreItem());
			}).then(() => {
				setIsLoading(false);
			});
		}
		if (pageNum > 5) {
			setIsAllLoaded(true);
		}
	}, [pageNum]);

	const getMoreItem = async () => {
		await axios
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
				console.log(e);
			});
	};

	const parseSearchContent = (queryString) => {
		return queryString.substr(queryString.indexOf('=') + 1);
	};

	return (
		<>
			<div className='cardList'>
				{isAllLoaded && !pictureList.length && (
					<p>{parseSearchContent(location.search)}에 대한 검색결과가 없습니다.</p>
				)}
				{pictureList.slice(0, currentViewableCardNum).map((picture) => (
					<PictureCard
						key={picture.pictureId}
						picture={picture}
						changeIsLikedOf={changeIsLikedOf}
						isLiked={likePictureIdSet.has(picture.pictureId)}
					/>
				))}
			</div>
			{!isAllLoaded && (
				<div style={{marginTop:40, display:'flex', justifyContent:'center'}}>
					{!isLoading && <div ref={setLastOfPage}></div>}
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>	
			)}
		</>
	);
};

// ref를 로딩바에 넣을 경우, 처음 페이지 로딩 시 page에 대한 useEffect로 인해 getMoreItem + 로딩바에 대한 접근으로 인해 intersection 후 getMoreItem으로 총 2번 로딩이 일어나는 오류 발생
export default PictureCardList;