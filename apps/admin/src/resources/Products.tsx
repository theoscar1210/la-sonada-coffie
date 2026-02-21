/**
 * CRUD de Productos para React Admin
 */

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ImageField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  Create,
  useRecordContext,
  FunctionField,
  type RaRecord,
} from 'react-admin';

const ROAST_CHOICES = [
  { id: 'LIGHT', name: 'Clara' },
  { id: 'MEDIUM_LIGHT', name: 'Media-Clara' },
  { id: 'MEDIUM', name: 'Media' },
  { id: 'MEDIUM_DARK', name: 'Media-Oscura' },
  { id: 'DARK', name: 'Oscura' },
];

const RoastLevelField = () => {
  const record = useRecordContext<RaRecord>();
  if (!record) return null;
  const labels: Record<string, string> = {
    LIGHT: '☀️ Clara',
    MEDIUM_LIGHT: '🌤 Media-Clara',
    MEDIUM: '⛅ Media',
    MEDIUM_DARK: '🌥 Media-Oscura',
    DARK: '☁️ Oscura',
  };
  return <span>{labels[record['roastLevel'] as string] ?? record['roastLevel']}</span>;
};

export const ProductList = () => (
  <List perPage={25} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <FunctionField
        label="Imagen"
        render={(record: RaRecord) => (
          <img
            src={(record['images'] as string[])?.[0] ?? '/placeholder.jpg'}
            alt={(record['name'] as string) ?? ''}
            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
      />
      <TextField source="name" label="Nombre" />
      <TextField source="origin" label="Origen" />
      <RoastLevelField />
      <NumberField source="price" label="Precio" options={{ style: 'currency', currency: 'COP', maximumFractionDigits: 0 }} />
      <NumberField source="stock" label="Stock" />
      <BooleanField source="featured" label="Destacado" />
      <BooleanField source="isActive" label="Activo" />
    </Datagrid>
  </List>
);

const ProductForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nombre" fullWidth required />
    <TextInput source="slug" label="Slug (URL)" fullWidth required helperText="Sólo letras minúsculas, números y guiones" />
    <TextInput source="shortDesc" label="Descripción corta" fullWidth multiline rows={2} required />
    <TextInput source="description" label="Descripción completa" fullWidth multiline rows={5} required />

    <NumberInput source="price" label="Precio (COP)" required />
    <NumberInput source="comparePrice" label="Precio original (tachado)" />
    <NumberInput source="stock" label="Stock disponible" required />
    <NumberInput source="weight" label="Peso (gramos)" required />

    <TextInput source="origin" label="Origen" required />
    <TextInput source="region" label="Región" />
    <TextInput source="altitude" label="Altitud (ej: 1800-2200 msnm)" />
    <TextInput source="process" label="Proceso (Lavado, Natural, Honey...)" />

    <SelectInput
      source="roastLevel"
      label="Nivel de tostión"
      choices={ROAST_CHOICES}
      required
    />

    <ArrayInput source="images" label="URLs de imágenes (Cloudinary)">
      <SimpleFormIterator inline>
        <TextInput source="" label="URL" helperText={false} />
      </SimpleFormIterator>
    </ArrayInput>

    <ArrayInput source="flavorNotes" label="Notas de sabor">
      <SimpleFormIterator inline>
        <TextInput source="" label="Nota" helperText={false} />
      </SimpleFormIterator>
    </ArrayInput>

    <ArrayInput source="grindOptions" label="Opciones de molienda">
      <SimpleFormIterator inline>
        <TextInput source="" label="Molienda" helperText={false} />
      </SimpleFormIterator>
    </ArrayInput>

    <BooleanInput source="featured" label="Producto destacado" />
    <BooleanInput source="isActive" label="Activo (visible en tienda)" defaultValue={true} />
  </SimpleForm>
);

export const ProductEdit = () => (
  <Edit title="Editar producto">
    <ProductForm />
  </Edit>
);

export const ProductCreate = () => (
  <Create title="Nuevo producto">
    <ProductForm />
  </Create>
);
