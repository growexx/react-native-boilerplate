const { getLoginResponse } = require('./../Login.util');

const userResponse = {
    default: {
        status: 'success',
        data: {
            token: 'oidehcfhioienwfszdfsf',
            username: 'Test User',
            email: 'user@test.com'
        }
    },
    facebook: {
        accessToken: '89923h8jenwjr9238yr9hjnidfjnswe98f'
    },
    google: {
        status: 'success',
        user: {
            name: 'name',
            email: 'test@email.com'
        }
    },
    apple: {
        fullName: 'name',
        email: 'test@email.com'
    }
}

describe('getLoginResponse', () => {
    it('should return the default response when the loginProvider is not provided', () => {
        const response = getLoginResponse();
        expect(response).toEqual(userResponse.default);
    });

    it('should return the Facebook response when "facebook" is provided as the loginProvider', () => {
        const response = getLoginResponse('facebook');
        expect(response).toEqual(userResponse.facebook);
    });

    it('should return the Google response when "google" is provided as the loginProvider', () => {
        const response = getLoginResponse('google');
        expect(response).toEqual(userResponse.google);
    });

    it('should return the Apple response when "apple" is provided as the loginProvider', () => {
        const response = getLoginResponse('apple');
        expect(response).toEqual(userResponse.apple);
    });

    it('should return the default response when an unsupported loginProvider is provided', () => {
        const response = getLoginResponse('unsupported');
        expect(response).toEqual(userResponse.default);
    });
});
