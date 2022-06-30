import React, { useState, useMemo } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { searchRangeLabelDict, searchRangeKeyEnum } from '../../consts/constants';
import './searchBox.scss';

const SearchBox = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchRange, setSearchRange] = useState(searchRangeKeyEnum.TOTAL);
	const [searchContent, setSearchContent] = useState('');

	const navigate = useNavigate();

	const location = useLocation();

	const [currSearchedRange, currSearchedContent] = useMemo(() => {
		const queryString = location.search;
		if(queryString === '') {
			setSearchRange(searchRangeKeyEnum.TOTAL)
			setSearchContent('')
			return [searchRangeKeyEnum.TOTAL, '']
		}
		const equalIndex = queryString.indexOf('=');
		const searchedRange= queryString.substring(1, equalIndex);
		const searchedContent = queryString.substring(equalIndex+1);
		setSearchRange(searchedRange)
		setSearchContent(searchedContent)
		return [searchedRange, searchContent]
	}, [location])

	const isSearchContentExists = useMemo(() => searchContent !== '', [searchContent]);

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
		if (event.key === 'Enter' && isSearchContentExists) {
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
		<div className="btn-group searchBox">
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle color="none" caret>
					{searchRangeLabelDict[searchRange]}
				</DropdownToggle>
				<DropdownMenu style={{ width: 120 }}>
					<DropdownItem value={searchRangeKeyEnum.TOTAL} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.TOTAL]}
					</DropdownItem>
					<DropdownItem value={searchRangeKeyEnum.TITLE} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.TITLE]}
					</DropdownItem>
					<DropdownItem value={searchRangeKeyEnum.DESCRIPTION} onClick={handleSearchRangeSelect}>
						{searchRangeLabelDict[searchRangeKeyEnum.DESCRIPTION]}
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Input
				type="text"
				placeholder="검색어를 입력해주세요"
				onChange={handleSearchContentChange}
				onKeyDown={handleSearchContentKeyDown}
				value={searchContent}
			/>

			<Button className="searchButton" color="primary" onClick={search}>
				검색하기
			</Button>
		</div>
	);
};

export default SearchBox;