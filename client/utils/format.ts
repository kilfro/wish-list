export const PriceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
})

export const dateFormatter = (dateTime: number) => {
    return new Date(dateTime).toLocaleDateString('ru-RU')
}