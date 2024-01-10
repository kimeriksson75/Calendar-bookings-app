import * as actions from '../../actions/residenceActions';
import Services from '../../services/residenceService';
import * as types from '../../constants';

const residence = {
    _id: '65429601add7c81260092af3',
    name: 'Residence 1',
    address: 'Address 1'
};

Services.getAvailableResidences = jest.fn();

describe('get available residences action', () => {

    it('should create an action to fetch available residences', async () => {
        const dispatch = jest.fn();

        Services.getAvailableResidences.mockImplementationOnce(async () => Promise.resolve({
            data: residence
        }));
        const initialGetAvailableResidencesAction = {
            type: types.FETCH_RESIDENCES,
            payload: null
        }
        const getAvailableResidencesSuccessAction = {
            type: types.FETCH_RESIDENCES_SUCCESS,
            payload: residence
        }
       
        await actions.getAvailableResidences()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableResidencesAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableResidencesSuccessAction);
            });
    });

    it('should handle fetch available residences error', async () => {
        const dispatch = jest.fn();

        Services.getAvailableResidences.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialGetAvailableResidencesAction = {
            type: types.FETCH_RESIDENCES,
            payload: null
        }
        const getAvailableResidencesErrorAction = {
            type: types.FETCH_RESIDENCES_ERROR,
            payload: null
        }
       
        await actions.getAvailableResidences()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableResidencesAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableResidencesErrorAction);
            });
    });
});