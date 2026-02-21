/**
 * Gestión de Órdenes para React Admin
 */

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SelectInput,
  Edit,
  SimpleForm,
  Show,
  SimpleShowLayout,
  useRecordContext,
  type RaRecord,
} from 'react-admin';

const STATUS_CHOICES = [
  { id: 'PENDING', name: 'Pendiente' },
  { id: 'CONFIRMED', name: 'Confirmado' },
  { id: 'PROCESSING', name: 'En preparación' },
  { id: 'SHIPPED', name: 'Enviado' },
  { id: 'DELIVERED', name: 'Entregado' },
  { id: 'CANCELLED', name: 'Cancelado' },
  { id: 'REFUNDED', name: 'Reembolsado' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#eab308',
  CONFIRMED: '#3b82f6',
  PROCESSING: '#8b5cf6',
  SHIPPED: '#6366f1',
  DELIVERED: '#22c55e',
  CANCELLED: '#ef4444',
  REFUNDED: '#6b7280',
};

const StatusBadge = () => {
  const record = useRecordContext<RaRecord>();
  if (!record) return null;
  const status = record['status'] as string;
  const label = STATUS_CHOICES.find((c) => c.id === status)?.name ?? status;
  return (
    <span
      style={{
        background: STATUS_COLORS[status] + '22',
        color: STATUS_COLORS[status],
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
};

export const OrderList = () => (
  <List
    perPage={25}
    sort={{ field: 'createdAt', order: 'DESC' }}
    filters={[
      <SelectInput key="status" source="status" choices={STATUS_CHOICES} label="Estado" alwaysOn />,
    ]}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="orderNumber" label="# Orden" />
      <TextField source="user.email" label="Cliente" sortable={false} />
      <StatusBadge />
      <NumberField
        source="total"
        label="Total"
        options={{ style: 'currency', currency: 'COP', maximumFractionDigits: 0 }}
      />
      <TextField source="shippingCity" label="Ciudad" />
      <DateField source="createdAt" label="Fecha" showTime />
    </Datagrid>
  </List>
);

export const OrderEdit = () => (
  <Edit title="Gestionar orden">
    <SimpleForm>
      <SelectInput
        source="status"
        label="Estado de la orden"
        choices={STATUS_CHOICES}
        required
      />
    </SimpleForm>
  </Edit>
);

export const OrderShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="orderNumber" label="# Orden" />
      <TextField source="status" label="Estado" />
      <NumberField source="subtotal" label="Subtotal" />
      <NumberField source="shippingCost" label="Envío" />
      <NumberField source="total" label="Total" />
      <TextField source="shippingName" label="Nombre" />
      <TextField source="shippingStreet" label="Dirección" />
      <TextField source="shippingCity" label="Ciudad" />
      <DateField source="createdAt" label="Fecha" showTime />
      <DateField source="paidAt" label="Fecha de pago" showTime />
    </SimpleShowLayout>
  </Show>
);
