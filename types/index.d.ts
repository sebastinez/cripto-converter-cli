declare module "eth-lib/lib/hash" {
    export function keccak256(str: string): string;
    export function keccak512(str: string): string;
    export function keccak256s(str: string): string;
    export function keccak512s(str: string): string;
}