import { 
  watchGetCustomers,
  watchGetCustomer,
  watchUpdateCustomer,
  watchAddCustomer,
  watchDeleteCustomer,
} from './customers'

const sagas = [
  watchGetCustomers,
  watchGetCustomer,
  watchUpdateCustomer,
  watchAddCustomer,
  watchDeleteCustomer,
]

export default sagas
