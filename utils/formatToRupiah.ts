export function formatToRupiah(amount: number, decimalPlaces: number = 0): string {
    if (typeof amount !== 'number' || isNaN(amount)) {
        // Handle invalid input gracefully
        console.error("Invalid amount provided to formatToRupiah:", amount);
        return 'Rp0'; 
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        // Optional: Ensure no decimals for integers, or set a specific number
        minimumFractionDigits: decimalPlaces, 
        maximumFractionDigits: decimalPlaces,
    });

    // The output will be in the format: "Rp1.500.000,00"
    // Since we set minimum/maximumFractionDigits to 0, it should be "Rp1.500.000"
    return formatter.format(amount);
}