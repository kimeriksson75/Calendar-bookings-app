import * as actions from '../../actions/userActions';
import Services from '../../services/userService';
import * as types from '../../constants';

const user = {
    _id: '658055edfaa7d604c938ec48',
    username: 'johndoe',
    email: 'johndoe@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    residence: '65429601add7c81260092af3',
    roles: ['user'],
};

Services.register = jest.fn();
Services.signIn = jest.fn();
Services.signInWithToken = jest.fn();
Services.signOut = jest.fn();
Services.requestNewPassword = jest.fn();

describe('create user actions', () => {
    
    it('should create an action to create a user', async () => {
        const dispatch = jest.fn();
    
        Services.register.mockImplementationOnce(async () => Promise.resolve({
            data: user
        }));
        const initialCreateUserAction = {
            type: types.CREATE_USER,
            payload: user
        }
        const createUserSuccessAction = {
            type: types.CREATE_USER_SUCCESS,
            payload: user
        }
        const newMessageAction = {
            type: types.NEW_MESSAGE,
            payload: {
                type: 'success',
                title: `${user.firstname} du har nu skapat en avändare`,
                description: `Logga in med ditt användarnamn ${user.username}.`
            }
        }
        
        await actions.createUser(user)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialCreateUserAction);
                expect(dispatch).toHaveBeenCalledWith(createUserSuccessAction);
                expect(dispatch).toHaveBeenCalledWith(newMessageAction);
            });
    });
    
    it('should handle create user error', async () => {
        const dispatch = jest.fn();
    
        Services.register.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialCreateUserAction = {
            type: types.CREATE_USER,
            payload: user
        }
        const createUserErrorAction = {
            type: types.CREATE_USER_ERROR,
            payload: null
        }
        
        await actions.createUser(user)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialCreateUserAction);
                expect(dispatch).toHaveBeenCalledWith(createUserErrorAction);
            });
    });
});

describe('login actions', () => {
    
    it('should create an action to sign in', async () => {
        const dispatch = jest.fn();
    
        Services.signIn.mockImplementationOnce(async () => Promise.resolve({
            data: user
        }));
        const initialSignInAction = {
            type: types.SIGN_IN_REQUEST,
            payload: null
        }
        const signInSuccessAction = {
            type: types.SIGN_IN_SUCCESS,
            payload: user
        }
        
        await actions.login(user.username, user.password)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignInAction);
                expect(dispatch).toHaveBeenCalledWith(signInSuccessAction);
            });
    });
    
    it('should handle sign in error', async () => {
        const dispatch = jest.fn();
    
        Services.signIn.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialSignInAction = {
            type: types.SIGN_IN_REQUEST,
            payload: null
        }
        const signInErrorAction = {
            type: types.SIGN_IN_ERROR,
            payload: null
        }
        
        await actions.login(user.username, user.password)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignInAction);
                expect(dispatch).toHaveBeenCalledWith(signInErrorAction);
            });
    });
});

describe('sign in with token actions', () => {
    
    it('should create an action to sign in with token', async () => {
        const dispatch = jest.fn();
    
        Services.signInWithToken.mockImplementationOnce(async () => Promise.resolve({
            data: user
        }));
        const initialSignInWithTokenAction = {
            type: types.SIGN_IN_REQUEST,
            payload: null
        }
        const signInWithTokenSuccessAction = {
            type: types.SIGN_IN_SUCCESS,
            payload: user
        }
        
        await actions.signInWithToken(user.token)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignInWithTokenAction);
                expect(dispatch).toHaveBeenCalledWith(signInWithTokenSuccessAction);
            });
    });
    
    it('should handle sign in with token error', async () => {
        const dispatch = jest.fn();
    
        Services.signInWithToken.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialSignInWithTokenAction = {
            type: types.SIGN_IN_REQUEST,
            payload: null
        }
        const signInWithTokenErrorAction = {
            type: types.SIGN_IN_ERROR,
            payload: null
        }
        
        await actions.signInWithToken(user.token)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignInWithTokenAction);
                expect(dispatch).toHaveBeenCalledWith(signInWithTokenErrorAction);
            });
    });
});

describe('sign out actions', () => {
    
    it('should create an action to sign out', async () => {
        const dispatch = jest.fn();
    
        Services.signOut.mockImplementationOnce(async () => Promise.resolve({
            data: null
        }));
        const initialSignOutAction = {
            type: types.SIGN_OUT_REQUEST,
            payload: null
        }
        const signOutSuccessAction = {
            type: types.SIGN_OUT_SUCCESS,
            payload: null
        }
        
        await actions.logout()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignOutAction);
                expect(dispatch).toHaveBeenCalledWith(signOutSuccessAction);
            });
    });
    
    it('should handle sign out error', async () => {
        const dispatch = jest.fn();
    
        Services.signOut.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialSignOutAction = {
            type: types.SIGN_OUT_REQUEST,
            payload: null
        }
        const signOutErrorAction = {
            type: types.SIGN_OUT_ERROR,
            payload: null
        }
        
        await actions.logout()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialSignOutAction);
                expect(dispatch).toHaveBeenCalledWith(signOutErrorAction);
            });
    });
});


describe('request new password actions', () => {
    
    it('should create an action to request new password', async () => {
        const dispatch = jest.fn();
    
        Services.requestNewPassword.mockImplementationOnce(async () => Promise.resolve({
            data: null
        }));
        const initialRequestNewPasswordAction = {
            type: types.REQUEST_NEW_PASSWORD,
            payload: null
        }
        const requestNewPasswordSuccessAction = {
            type: types.REQUEST_NEW_PASSWORD_SUCCESS,
            payload: null
        }
        const newMessageAction = {
            type: types.NEW_MESSAGE,
            payload: {
                type: 'success',
                title: 'Ett mail har skickats till din e-postadress',
                description: 'Följ instruktionerna i mailet för att återställa ditt lösenord.'
            }
        }
        
        await actions.requestNewPassword(user.email)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialRequestNewPasswordAction);
                expect(dispatch).toHaveBeenCalledWith(requestNewPasswordSuccessAction);
                expect(dispatch).toHaveBeenCalledWith(newMessageAction);
            });
    });
    
    it('should handle request new password error', async () => {
        const dispatch = jest.fn();
    
        Services.requestNewPassword.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialRequestNewPasswordAction = {
            type: types.REQUEST_NEW_PASSWORD,
            payload: null
        }
        const requestNewPasswordErrorAction = {
            type: types.REQUEST_NEW_PASSWORD_ERROR,
            payload: null
        }
        
        await actions.requestNewPassword(user.email)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialRequestNewPasswordAction);
                expect(dispatch).toHaveBeenCalledWith(requestNewPasswordErrorAction);
            });
    });
});

describe('user profile action', () => {
    it('should create an action to set user profile', () => {

        const expectedAction = {
            type: types.USER_PROFILE,
            payload: user
        }
        expect(actions.setUserProfile(user)).toEqual(expectedAction)
    });
})