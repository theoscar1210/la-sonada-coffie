import { defineType, defineField } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Ej: "Tostador Jefe", "Barista", "Q-Grader"',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
});
