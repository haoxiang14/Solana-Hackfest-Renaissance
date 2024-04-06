use anchor_lang::prelude::*;

use crate::state::Presale;

pub fn create_presale(
    ctx: Context<CreatePresale>,
    token_address: Pubkey,
    qty_max: u64,
    price: u64,
) -> Result<()> {
    let presale = &mut ctx.accounts.presale;

    presale.token_address = token_address;
    presale.qty_max = qty_max;
    presale.price = price;
    presale.is_live = false;
                            //
    presale.authority = ctx.accounts.authority.key();
    presale.bump = ctx.bumps.presale;

    msg!("Created {} token presale", presale.token_address);

    Ok(())
}

#[derive(Accounts)]
pub struct CreatePresale<'info> {
    #[account(
        init, 
        seeds = [b"presale".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority, 
        space = 8 + std::mem::size_of::<Presale>()
    )]
    pub presale: Box<Account<'info, Presale>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
