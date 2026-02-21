/**
 * LA SOÑADA COFFIE — Sanity Studio Config
 * Blog, historia de marca y contenido estático
 */

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { blogPost } from './schemas/blogPost';
import { author } from './schemas/author';
import { category as blogCategory } from './schemas/category';

const projectId = process.env['SANITY_PROJECT_ID'] ?? '';
const dataset = process.env['SANITY_DATASET'] ?? 'production';

export default defineConfig({
  name: 'la-sonada-coffie',
  title: 'LA SOÑADA COFFIE — CMS',
  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Artículos')
                      .schemaType('blogPost')
                      .child(S.documentTypeList('blogPost').title('Artículos')),
                    S.listItem()
                      .title('Categorías')
                      .schemaType('blogCategory')
                      .child(S.documentTypeList('blogCategory').title('Categorías')),
                    S.listItem()
                      .title('Autores')
                      .schemaType('author')
                      .child(S.documentTypeList('author').title('Autores')),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [blogPost, author, blogCategory],
  },
});
