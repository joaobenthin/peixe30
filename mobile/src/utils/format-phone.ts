export function formatPhoneNumber(number: string): string {
  const digitsOnly = number.replace(/\D/g, '')

  const pattern =
    digitsOnly.length === 11 ? /(\d{2})(\d{5})(\d{4})/ : /(\d{2})(\d{4})(\d{4})/

  return digitsOnly.replace(pattern, '($1) $2-$3')
}
