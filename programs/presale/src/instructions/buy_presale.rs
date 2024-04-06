use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

use crate::errors::PresaleError;
use crate::state::Presale;

// amt in quote token (SOL)
pub fn buy_presale(ctx: Context<BuyPresale>, amt: u64) -> Result<()> {
    let presale = &mut ctx.accounts.presale;

    if !presale.is_live {
        return Err(PresaleError::NotLive.into());
    }

    if presale.qty == 0 {
        return Err(PresaleError::SoldOut.into());
    }

    if amt > presale.qty {
        return Err(PresaleError::StockNotEnough.into());
    }

    presale.qty -= amt * presale.price;

    msg!(
        "Transferring SOL from buyer: {} to presale: {}",
        &ctx.accounts
            .buyer_quote_token_associated_token_account
            .key(),
        &ctx.accounts
            .presale_quote_token_associated_token_account
            .key()
    );
    let _ = token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx
                    .accounts
                    .buyer_quote_token_associated_token_account
                    .to_account_info(),
                to: ctx
                    .accounts
                    .presale_quote_token_associated_token_account
                    .to_account_info(),
                authority: ctx.accounts.signer.to_account_info(),
            },
        ),
        amt,
    );

    let presalee = presale.clone();
    let seeds = &[
        b"presale".as_ref(),
        presalee.authority.as_ref(),
        &[presale.bump],
    ];
    let signer = &[&seeds[..]];
    let ammount = amt * presale.price;

    msg!(
        "Transferring token from presale: {} to buyer: {}",
        &ctx.accounts
            .presale_quote_token_associated_token_account
            .key(),
        &ctx.accounts
            .buyer_quote_token_associated_token_account
            .key(),
    );
    let _ = token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx
                    .accounts
                    .presale_token_associated_token_account
                    .to_account_info(),
                to: ctx
                    .accounts
                    .buyer_token_associated_token_account
                    .to_account_info(),
                authority: ctx.accounts.presale.to_account_info(),
            },
            signer,
        ),
        ammount,
    );

    Ok(())
}

#[derive(Accounts)]
pub struct BuyPresale<'info> {
    #[account(
        mut,
        seeds = [b"presale".as_ref(), authority.key().as_ref()],
        bump = presale.bump
    )]
    pub presale: Box<Account<'info, Presale>>,

    #[account(mut)]
    pub quote_token_mint_account: Box<Account<'info, token::Mint>>,

    #[account(mut)]
    pub token_mint_account: Box<Account<'info, token::Mint>>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = quote_token_mint_account,
        associated_token::authority = signer,
    )]
    pub buyer_quote_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = quote_token_mint_account,
        associated_token::authority = authority,
    )]
    pub presale_quote_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = token_mint_account,
        associated_token::authority = signer,
    )]
    pub buyer_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,
    #[account(
        mut,
        associated_token::mint = token_mint_account,
        associated_token::authority = presale,
    )]
    pub presale_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}
