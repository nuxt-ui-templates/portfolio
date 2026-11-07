import type { ContentRegistry } from 'comark-content'

// v4 doesn't export v3's `<Collection>CollectionItem` types. It generates each collection's data
// type from `content.config.ts` into the `comark-content` registry instead.
export type IndexPage = ContentRegistry['index']['data']
export type BlogPost = ContentRegistry['blog']['data']
