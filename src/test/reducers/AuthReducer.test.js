import AuthReducer from '../../reducers/AuthReducer';
import * as actions from '../../constants';

const initialState = {
	isSignedIn: false,
	isFetching: false,
	user: null
};

const user = {
	_id: '658055edfaa7d604c938ec48',
	username: 'johndoe',
	email: 'johndoe@mail.com',
	firstname: 'John',
	lastname: 'Doe',
	residence: '65429601add7c81260092af3',
	roles: ['user'],
};

describe('AuthReducer', () => {
	it('should return the initial state', () => {
			expect(AuthReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle SIGN_IN_REQUEST', () => {
			expect(
				AuthReducer(initialState, {
						type: actions.SIGN_IN_REQUEST,
						payload: null,
				})
			).toEqual({
					isSignedIn: false,
					isFetching: true,
					user: null
			});
	});

	it('should handle SIGN_IN_SUCCESS', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.SIGN_IN_SUCCESS,
							payload: user,
					})
			).toEqual({
					isSignedIn: true,
					isFetching: false,
					user: user
			});
	});

	it('should handle SIGN_IN_ERROR', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.SIGN_IN_ERROR,
							payload: null,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: null
			});
	});

	it('should handle SIGN_OUT_REQUEST', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.SIGN_OUT_REQUEST,
							payload: null,
					})
			).toEqual({
					isSignedIn: true,
					isFetching: true,
					user: null
			});
	});

	it('should handle SIGN_OUT_SUCCESS', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.SIGN_OUT_SUCCESS,
							payload: null,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: null
			});
	});

	it('should handle SIGN_OUT_ERROR', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.SIGN_OUT_ERROR,
							payload: null,
					})
			).toEqual({
					isSignedIn: true,
					isFetching: false,
					user: null
			});
	});

	it('should handle USER_PROFILE', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.USER_PROFILE,
							payload: user,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: null,
					userProfile: user
			});
	});

	it('should handle CREATE_USER', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.CREATE_USER,
							payload: user,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: true,
					user: user
			});
	});

	it('should handle CREATE_USER_SUCCESS', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.CREATE_USER_SUCCESS,
							payload: user,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: user
			});
	});

	it('should handle CREATE_USER_ERROR', () => {
			expect(
					AuthReducer(initialState, {
							type: actions.CREATE_USER_ERROR,
							payload: null,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: null
			});
	});

	it('sohuld handle default', () => {
			expect(
					AuthReducer(initialState, {
							type: 'default',
							payload: null,
					})
			).toEqual({
					isSignedIn: false,
					isFetching: false,
					user: null
			});
	});
});
    