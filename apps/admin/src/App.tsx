/**
 * LA SOÑADA COFFIE — Panel Administrativo
 * Construido con React Admin
 */

import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { ProductList, ProductEdit, ProductCreate } from './resources/Products';
import { OrderList, OrderEdit } from './resources/Orders';
import { UserList, UserShow } from './resources/Users';
import { Dashboard } from './components/Dashboard';

// Tema personalizado con colores de La Soñada
const theme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#b06325',
      light: '#c97e2f',
      dark: '#8f4c20',
      contrastText: '#fdf5e4',
    },
    secondary: {
      main: '#3d1f11',
      contrastText: '#fdf5e4',
    },
    background: {
      default: '#fdf8f3',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "sans-serif"',
    h6: {
      fontFamily: '"Playfair Display", "Georgia", "serif"',
    },
  },
  shape: {
    borderRadius: 12,
  },
};

export function App() {
  return (
    <Admin
      title="LA SOÑADA COFFIE — Admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      theme={theme}
      loginPage={undefined}
    >
      <Resource
        name="products"
        options={{ label: 'Productos' }}
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        recordRepresentation="name"
      />
      <Resource
        name="orders"
        options={{ label: 'Órdenes' }}
        list={OrderList}
        edit={OrderEdit}
        recordRepresentation="orderNumber"
      />
      <Resource
        name="users"
        options={{ label: 'Usuarios' }}
        list={UserList}
        show={UserShow}
        recordRepresentation="email"
      />
    </Admin>
  );
}
