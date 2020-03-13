module.exports = {
  iliTypesItem: [
    {id: 'f8cd8bf9-8263-40e0-9460-c0951aa648ad', name: 'Folder', description: 'Folder'},
    {id: 'b6e327aa-de3d-4453-a5a4-3e399c596880', name: 'WorkSpace', description: 'WorkSpace'},
    {id: 'a2de225b-91c1-4658-85c5-ee899146b497', name: 'Task', description: 'Task'},
  ],
  iliTypesLink: [
    {id: '9dab6ac9-9421-4deb-97ab-4eaa433378cc', name: 'AnyItems', description: 'AnyItems'},
    {id: '56fe0b15-1844-4d43-9567-6553804463a6', name: 'WorkSpace', description: 'WorkSpace'},
    {id: 'a86fe40e-b6e4-4f2b-b17d-a5f2b4b15134', name: 'SubTasks', description: 'SubTasks'},
  ],
  clearDBPG: ['prefix_ili_items', 'prefix_ili_links', 'prefix_ili_types_item', 'prefix_ili_types_link', 'prefix_ili_links_rule'],
  initDBPG: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n' +
    '\n' +
    'CREATE TABLE prefix_ili_types_item\n' +
    '(\n' +
    '    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n' +
    '    name        VARCHAR(255) NOT NULL,\n' +
    '    description TEXT\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE prefix_ili_types_link\n' +
    '(\n' +
    '    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n' +
    '    name        VARCHAR(255) NOT NULL,\n' +
    '    description TEXT\n' +
    ');\n' +
    '\n' +
    '\n' +
    'CREATE TABLE prefix_ili_items\n' +
    '(\n' +
    '    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n' +
    '    name         VARCHAR(255)                        NOT NULL,\n' +
    '    description  TEXT,\n' +
    '    id_type_item UUID references prefix_ili_types_item (id) NOT NULL\n' +
    ');\n' +
    '\n' +
    'CREATE TABLE prefix_ili_links\n' +
    '(\n' +
    '    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n' +
    '    name         VARCHAR(255)                        NOT NULL,\n' +
    '    description  TEXT,\n' +
    '    id_item      UUID references prefix_ili_items (id)      NOT NULL,\n' +
    '    id_item_1    UUID references prefix_ili_items (id)      NOT NULL,\n' +
    '    id_item_2    UUID references prefix_ili_items (id)      NOT NULL,\n' +
    '    id_type_link UUID references prefix_ili_types_link (id) NOT NULL\n' +
    ');\n' +
    '\n' +
    'ALTER TABLE prefix_ili_items\n' +
    '    ADD COLUMN id_link UUID references prefix_ili_links (id);\n' +
    '\n'
}

// +
// 'CREATE TABLE prefix_ili_links_rule\n' +
// '(\n' +
// '    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n' +
// '    name         VARCHAR(255)                        NOT NULL,\n' +
// '    description  TEXT,\n' +
// '    id_type_link UUID references prefix_ili_links_rule (id) NOT NULL,\n' +
// '    id_type_item UUID references prefix_ili_items (id)      NOT NULL\n' +
// ');\n'
