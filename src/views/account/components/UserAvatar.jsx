/* eslint-disable indent */
import { CircularProgress } from 'components/common';
import { ACCOUNT } from 'constants/routes';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from 'redux/actions/authActions';

const UserNav = ({ profile, isAuthenticating }) => {
	const userNav = useRef(null);
	const dispatch = useDispatch();

	const toggleDropdown = (e) => {
		const closest = e.target.closest('div.user-nav');

		try {
			if (!closest && userNav.current.classList.contains('user-sub-open')) {
				userNav.current.classList.remove('user-sub-open');
			}
		} catch (err) { }
	};

	useEffect(() => {
		document.addEventListener('click', toggleDropdown);

		return () => document.removeEventListener('click', toggleDropdown);
	}, []);

	const onClickNav = () => {
		userNav.current.classList.toggle('user-sub-open');
	};

	return isAuthenticating ? (
		<div className="user-nav">
			<span>Signing Out</span>
			<CircularProgress />
		</div>
	) : (
		<div
			className="user-nav"
			onClick={onClickNav}
			ref={userNav}
		>
			<h5 className="text-overflow-ellipsis">{profile.fullname && profile.fullname.split(' ')[0]}</h5>
			<div className="user-nav-img-wrapper">
				<img
					alt=""
					className="user-nav-img"
					src={profile.avatar}
				/>
			</div>
			<div className="icon-caret user-caret" />
			<div className="user-nav-sub">
				{profile.role !== 'ADMIN' && (
					<Link
						to={ACCOUNT}
						className="user-nav-sub-link"
					>
						View Account
						<i className="fa fa-user" />
					</Link>
				)}
				<h6
					className="user-nav-sub-link margin-0 d-flex"
					onClick={() => dispatch(signOut())}
				>
					Sign Out
						<i className="fa fa-sign-out-alt" />
				</h6>
			</div>
		</div>
	);
};

UserNav.propType = {
	profile: PropTypes.object.isRequired
};

export default withRouter(UserNav);