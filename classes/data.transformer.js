module.exports = class DataTransformer {
    metas(metas) {
        return metas.slice(0, Number(process.env.LIMIT_CURRENCIES)).map(meta => ({
            symbol: meta.symbol,
            name: meta.name,
            slug: meta.slug
        }))
    }

    history(histories) {
        return histories.map((coin) => [
            coin.time,
            coin.close
        ])
    }

    uriPath(symbol) {
        return 'https://min-api.cryptocompare.com/data/histoday' +
            '?aggregate=1' +
            '&allData=true' +
            '&e=CCCAGG' +
            '&tryConversion=true' +
            '&tsym=USD' +
            `&fsym=${String(symbol).toUpperCase()}`
    }

    currencies(currencies) {
        return currencies.slice(0, Number(process.env.LIMIT_CURRENCIES)).map((currency) => {
            return {
                id: currency.id,
                name: currency.name,
                symbol: currency.symbol,
                rank: Number(currency.rank),
                price: Number(currency.price_usd),
                market_cap: Number(currency.market_cap_usd),
                supply: Number(currency.available_supply),
                percent_change_hour: Number(currency.percent_change_1h),
                percent_change_day: Number(currency.percent_change_24h),
                percent_change_week: Number(currency.percent_change_7d),
                volume_day: Number(currency['24h_volume_usd']),
                last_updated: Number(currency.last_updated)
            }
        })
    }
}
