import * as actions from '../../actions/apartmentActions';
import Services from '../../services/apartmentService';
import * as types from '../../constants';

const apartments = [{
    _id: '6581f098cd9259bca4cc3d8a',
    name: 'Apartment 1',
    address: 'Address 1',
    },
    {
    _id: '6581f098cd9259bca4cc3d8a',
    name: 'Apartment 2',
    address: 'Address 2',
}];

Services.getAvailableApartments = jest.fn();

describe('get apartments actions', () => {
        
    it('should create an action to get available apartments', async () => {
        const dispatch = jest.fn();
    
        Services.getAvailableApartments.mockImplementationOnce(async () => Promise.resolve({
            data: apartments
        }));
        const initialGetAvailableApartmentsAction = {
            type: types.FETCH_APARTMENTS,
            payload: null
        }
        const getAvailableApartmentsSuccessAction = {
            type: types.FETCH_APARTMENTS_SUCCESS,
            payload: apartments
        }
        
        await actions.getAvailableApartments(apartments[0].residence)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableApartmentsAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableApartmentsSuccessAction);
            });
    });
    
    it('should handle get apartments error', async () => {
        const dispatch = jest.fn();
    
        Services.getAvailableApartments.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialGetAvailableApartmentsAction = {
            type: types.FETCH_APARTMENTS,
            payload: null
        }
        const getAvailableApartmentsErrorAction = {
            type: types.FETCH_APARTMENTS_ERROR,
            payload: null
        }
        
        await actions.getAvailableApartments(apartments[0].residence)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableApartmentsAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableApartmentsErrorAction);
            });
    });
});
    