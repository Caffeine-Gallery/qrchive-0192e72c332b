import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface UrlEntry { 'url' : string, 'timestamp' : bigint }
export interface _SERVICE {
  'addUrl' : ActorMethod<[string], Array<UrlEntry>>,
  'getHistory' : ActorMethod<[], Array<UrlEntry>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
