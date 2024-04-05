use anchor_lang::prelude::*;

declare_id!("7wdX7ExMUqLZS2DiUFY6rbXAzRdyA7uK6yG5e4veFuyX");

#[program]
pub mod presale {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
