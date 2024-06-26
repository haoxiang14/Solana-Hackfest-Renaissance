use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

// declare_id!("7wdX7ExMUqLZS2DiUFY6rbXAzRdyA7uK6yG5e4veFuyX");
declare_id!("GmCJDa4X3f8PsxAi7YKEEHfRgZrBzqPTeQFaAD7ebFgJ");

#[program]
pub mod presale {
    use super::*;

    pub fn create_presale(
        ctx: Context<CreatePresale>,
        token_address: Pubkey,
        qty_max: u64,
        price: u64,
    ) -> Result<()> {
        create_presale::create_presale(ctx, token_address, qty_max, price)
    }

    pub fn start_presale(ctx: Context<StartPresale>, qty: u64) -> Result<()> {
        start_presale::start_presale(ctx, qty)
    }

    pub fn buy_presale(ctx: Context<BuyPresale>, ant: u64) -> Result<()> {
        buy_presale::buy_presale(ctx, ant)
    }
}
