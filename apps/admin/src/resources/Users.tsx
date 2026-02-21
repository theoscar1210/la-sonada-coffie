/**
 * Gestión de Usuarios para React Admin
 */

import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  NumberField,
} from 'react-admin';

export const UserList = () => (
  <List perPage={25} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <EmailField source="email" label="Email" />
      <TextField source="name" label="Nombre" />
      <TextField source="role" label="Rol" />
      <NumberField source="_count.orders" label="Órdenes" sortable={false} />
      <BooleanField source="isActive" label="Activo" />
      <DateField source="createdAt" label="Registro" />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="role" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
    </SimpleShowLayout>
  </Show>
);
