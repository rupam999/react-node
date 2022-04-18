import { getDummyData } from '../controllers/dummy.js';

export const dummyData = (router) => {
	router.get('/dummy', getDummyData);
};
