import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentImageContent extends Schema.Component {
  collectionName: 'components_content_image_contents';
  info: {
    displayName: 'Image_content';
    icon: 'picture';
    description: '';
  };
  attributes: {
    Image_content: Attribute.Media;
    Image_heading: Attribute.String;
  };
}

export interface ContentImageTextContent extends Schema.Component {
  collectionName: 'components_content_image_text_contents';
  info: {
    displayName: 'Image_Text_content';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    Image_heading: Attribute.String;
    Image_content: Attribute.Media;
    text_heading: Attribute.String;
    text_content: Attribute.String;
  };
}

export interface ContentTextContent extends Schema.Component {
  collectionName: 'components_content_text_contents';
  info: {
    displayName: 'text_content';
    icon: 'filter';
  };
  attributes: {
    heading: Attribute.String;
    text_content: Attribute.Blocks;
  };
}

export interface DividersSimpleDivider extends Schema.Component {
  collectionName: 'components_dividers_simple_dividers';
  info: {
    displayName: 'Simple_divider';
    icon: 'bulletList';
  };
  attributes: {
    divider_heading: Attribute.String;
  };
}

export interface MetadataMetaData extends Schema.Component {
  collectionName: 'components_metadata_meta_data';
  info: {
    displayName: 'meta_data';
    icon: 'oneToMany';
    description: '';
  };
  attributes: {
    meta_tags: Attribute.String & Attribute.Required & Attribute.Unique;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.image-content': ContentImageContent;
      'content.image-text-content': ContentImageTextContent;
      'content.text-content': ContentTextContent;
      'dividers.simple-divider': DividersSimpleDivider;
      'metadata.meta-data': MetadataMetaData;
    }
  }
}
