import axios from 'restyped-axios';

import BsBotApi from '../../shared/types/bs-bot-api-restyped';
import { API_PATH } from '../../shared/constants';

export default axios.create<BsBotApi>({ baseURL: API_PATH });
