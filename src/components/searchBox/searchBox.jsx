import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { searchRangeLabelDict, searchRangeKeyEnum } from '../../consts/constants';
import styles from './searchBox.module.scss';

const SearchBox = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchRange, setSearchRange] = useState(searchRangeKeyEnum.TOTAL);
	const [searchContent, setSearchContent] = useState('');

	const navigate = useNavigate();

	const location = useLocation();

	useEffect(() => {
		const queryString = location.search;
		if(queryString === '') {
			setSearchRange(searchRangeKeyEnum.TOTAL)
			setSearchContent('')
			return
		}
		const equalIndex = queryString.indexOf('=');
		const searchedRange= queryString.substring(1, equalIndex);
		const searchedContent = queryString.substring(equalIndex+1);
		setSearchRange(searchedRange)
		setSearchContent(searchedContent)
	}, [location])

	const toggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleSearchRangeSelect = (event) => {
		setSearchRange(event.target.value);
	};

	const handleSearchContentChange = (event) => {
		setSearchContent(event.target.value);
	};

	const handleSearchContentKeyDown = (event) => {
		if (event.key === 'Enter') {
			search();
		}
	};

	const search = () => {
		if (searchContent === '') {
			navigate('/');
		} else {
			navigate(`/search?${searchRange}=${searchContent}`);
		}
	};

	return (
		<div className={`btn-group ${styles.searchBox}`}>
			<Dropdown className={styles.searchBox__dropdown} isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className={styles.searchBox__dropdown__toggle} color="none" caret>
					{searchRangeLabelDict[searchRange]}
				</DropdownToggle>
				<DropdownMenu className={styles.searchBox__dropdown__menu} style={{ width: 120 }}>
					<DropdownItem className={styles.searchBox__dropdown__menu__item} value={searchRangeKeyEnum.TOTAL} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.TOTAL]}
					</DropdownItem>
					<DropdownItem className={styles.searchBox__dropdown__menu__item} value={searchRangeKeyEnum.TITLE} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.TITLE]}
					</DropdownItem>
					<DropdownItem className={styles.searchBox__dropdown__menu__item} value={searchRangeKeyEnum.DESCRIPTION} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.DESCRIPTION]}
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Input
				type="text"
				className={styles.searchBox__input}
				placeholder="검색어를 입력해주세요"
				onChange={handleSearchContentChange}
				onKeyDown={handleSearchContentKeyDown}
				value={searchContent}
			/>

			<Button className={styles.searchBox__searchButton} color="primary" onClick={search}>
				검색하기
			</Button>
		</div>
	);
};

export default SearchBox;