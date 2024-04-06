use anchor_lang::prelude::*;

#[error_code]
pub enum PresaleError {
    #[msg("Presale is not live")]
    NotLive,
    #[msg("Presale tokens are sold out")]
    SoldOut,
    #[msg("Not enought tokens in presale stock")]
    StockNotEnough,
}
