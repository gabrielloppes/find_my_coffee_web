import Api from './api';

const googleListOfEstablishmentsService = {
  index: (latitude, longitude) =>
    Api.get(`/google_store?latitude=${latitude}&longitude=${longitude}`),
};

export default googleListOfEstablishmentsService;
