use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

use crate::state::Presale;

pub fn start_presale(ctx: Context<StartPresale>, qty: u64) -> Result<()> {
    let presale = &mut ctx.accounts.presale;

    msg!(
        "Transferring token from owner: {} to presale: {}",
        &ctx.accounts.authority_associated_token_account.key(),
        &ctx.accounts.presale_associated_token_account.key()
    );

    let _ = token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                authority: ctx.accounts.authority.to_account_info(),
                from: ctx
                    .accounts
                    .authority_associated_token_account
                    .to_account_info(),
                to: ctx
                    .accounts
                    .presale_associated_token_account
                    .to_account_info(),
            },
        ),
        qty,
    );

    presale.qty = qty;
    presale.is_live = true;

    Ok(())
}

#[derive(Accounts)]
pub struct StartPresale<'info> {
    #[account(
        mut,
        seeds = [b"presale".as_ref(), authority.key().as_ref()],
        bump = presale.bump
    )]
    pub presale: Box<Account<'info, Presale>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint_account,
        associated_token::authority = presale
    )]
    pub presale_associated_token_account: Account<'info, token::TokenAccount>,

    #[account(mut)]
    pub authority_associated_token_account: Account<'info, token::TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub mint_account: Account<'info, token::Mint>,

    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}
