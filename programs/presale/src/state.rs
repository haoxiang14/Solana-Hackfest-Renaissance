use anchor_lang::prelude::*;

#[account]
pub struct Presale {
    pub token_address: Pubkey,
    pub qty_max: u64,
    pub qty: u64,
    pub price: u64, // in SOL
    pub is_live: bool,
    pub authority: Pubkey,
    pub bump: u8,
}
