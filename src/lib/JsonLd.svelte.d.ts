import { SvelteComponentTyped } from 'svelte';
import { Thing, WithContext } from 'schema-dts';

export interface JsonLdProps {
  schema?: Thing | WithContext<Thing>;
}

export default class JsonLd extends SvelteComponentTyped<JsonLdProps> {}
